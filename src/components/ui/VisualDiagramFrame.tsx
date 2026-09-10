import type { ReactNode } from 'react'

export interface VisualDiagramFrameProps {
  id?: string
  number?: string
  title: string
  subtitle?: string
  status?: string
  imageSrc: string
  imageAlt: string
  aspectRatio?: string
  overlays?: ReactNode
  footer?: ReactNode
  className?: string
}

export default function VisualDiagramFrame({
  id,
  number,
  title,
  subtitle,
  status,
  imageSrc,
  imageAlt,
  aspectRatio = '16 / 9',
  overlays,
  footer,
  className = '',
}: VisualDiagramFrameProps) {
  return (
    <div
      className={`visual-diagram-frame ${className}`}
      id={id}
      role="region"
      aria-label={`${title} system diagram`}
    >
      <div className="diagram-frame-header">
        <div className="diagram-frame-title">
          {number && <span className="diagram-frame-number">{number}</span>}
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </div>
        {status && (
          <div className="diagram-frame-status">
            <i className="status-indicator" aria-hidden="true" />
            <span>{status}</span>
          </div>
        )}
      </div>

      <div className="diagram-frame-canvas" style={{ aspectRatio }}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="diagram-frame-image"
          loading="lazy"
          decoding="async"
        />
        <div className="diagram-frame-scrim" aria-hidden="true" />
        {overlays && <div className="diagram-frame-overlays">{overlays}</div>}
      </div>

      {footer && <div className="diagram-frame-footer">{footer}</div>}
    </div>
  )
}
