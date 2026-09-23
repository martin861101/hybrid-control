#!/usr/bin/env python3
"""Move every item in a site's public_html into a sibling hybrid.old directory.

Uses FTP-over-TLS (explicit FTPS) by default. Run with --ftp only if the
provider does not support FTPS and you understand that credentials are sent
in plaintext. Requires MLSD to enumerate hidden files reliably.
"""

import argparse
import getpass
import posixpath
import ssl
import sys
from ftplib import FTP, FTP_TLS, all_errors


def directory_entries(ftp, path):
    """List names including dotfiles; fail closed if MLSD is unsupported."""
    try:
        return sorted(name for name, _facts in ftp.mlsd(path) if name not in (".", ".."))
    except all_errors as exc:
        raise RuntimeError(
            f"Cannot list {path!r} with MLSD ({exc}). No files moved. "
            "Use a hosting file manager or SFTP instead; NLST may miss hidden files."
        ) from exc


def is_directory(ftp, path):
    previous = ftp.pwd()
    try:
        ftp.cwd(path)
        return True
    except all_errors:
        return False
    finally:
        ftp.cwd(previous)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ftp", action="store_true", help="Insecure plain FTP; prefer FTPS")
    args = parser.parse_args()

    host = input("FTP/FTPS server hostname (e.g. ftp.example.co.za): ").strip()
    username = input("FTP username: ").strip()
    password = getpass.getpass("FTP password (hidden): ")
    source_input = input("Remote public_html path [/public_html]: ").strip() or "/public_html"
    if not host or not username:
        parser.error("Host and username are required")

    source = posixpath.normpath("/" + source_input.lstrip("/"))
    if source == "/" or posixpath.basename(source) != "public_html":
        parser.error("Source must be a directory named public_html, not FTP root")
    destination = posixpath.join(posixpath.dirname(source), "hybrid.old")
    if source == destination:
        parser.error("Source and destination cannot be the same")

    ftp = None
    try:
        if args.ftp:
            print("WARNING: Using plain FTP. Username, password and data are not encrypted.")
            ftp = FTP(timeout=30)
            ftp.connect(host, 21)
            ftp.login(username, password)
        else:
            ftp = FTP_TLS(context=ssl.create_default_context(), timeout=30)
            ftp.connect(host, 21)
            ftp.login(username, password)
            ftp.prot_p()  # Encrypt file listings and data connections as well.

        print(f"\nSource:      {source}")
        print(f"Destination: {destination}")
        print("Only items inside public_html will be moved; public_html itself remains.")

        if not is_directory(ftp, source):
            raise RuntimeError(f"Source directory not accessible: {source}")
        parent = posixpath.dirname(source)
        if not is_directory(ftp, parent):
            raise RuntimeError(f"Parent directory not accessible: {parent}")

        names = directory_entries(ftp, source)
        if not names:
            print("public_html is empty; nothing to move.")
            return 0

        dest_exists = is_directory(ftp, destination)
        if dest_exists and directory_entries(ftp, destination):
            raise RuntimeError(
                f"Destination {destination} already contains items; refusing to merge or overwrite."
            )

        print(f"\nWill move {len(names)} top-level item(s), including entire subfolders:")
        for name in names:
            print(f"  {name}")
        print("\nWARNING: The old website may go offline until you upload the new dist files.")
        answer = input("Type MOVE to perform these remote renames: ").strip()
        if answer != "MOVE":
            print("Cancelled. Nothing moved.")
            return 0

        if not dest_exists:
            ftp.mkd(destination)
        # Recheck immediately before modifying anything.
        if directory_entries(ftp, destination):
            raise RuntimeError("Destination is no longer empty; refusing to proceed")
        current = directory_entries(ftp, source)
        if current != names:
            raise RuntimeError("Source changed since preview; refusing to proceed")

        moved = []
        for name in names:
            src = posixpath.join(source, name)
            dst = posixpath.join(destination, name)
            try:
                ftp.rename(src, dst)  # Server-side RNFR/RNTO; no download/reupload.
                moved.append(name)
                print(f"[MOVED] {name}")
            except all_errors as exc:
                print(f"[FAILED] {name}: {exc}", file=sys.stderr)
                print("Some items may have moved. Do not rerun until you inspect both folders.", file=sys.stderr)
                return 2

        remaining = directory_entries(ftp, source)
        archived = directory_entries(ftp, destination)
        if remaining or archived != names:
            print("WARNING: Post-move check differs from expected listing.", file=sys.stderr)
            print(f"Remaining in public_html: {remaining}", file=sys.stderr)
            return 2
        print(f"\nSuccess: moved all {len(moved)} items to {destination}.")
        print("public_html is now empty and ready for your new dist contents.")
        return 0
    except (all_errors, RuntimeError, OSError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    finally:
        if ftp is not None:
            try:
                ftp.quit()
            except (all_errors, OSError):
                ftp.close()


if __name__ == "__main__":
    sys.exit(main())
