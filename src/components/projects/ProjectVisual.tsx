import { Activity, BarChart3, Droplets, Factory, RadioTower, Waves } from 'lucide-react'
import type { projects } from '../../data/site'

type Project = (typeof projects)[number]

const icons = [Droplets, RadioTower, Factory, Activity, Waves, BarChart3]

export default function ProjectVisual({ project, index, compact = false }: { project: Project; index: number; compact?: boolean }) {
  const Icon = icons[index % icons.length]
  return <div className={`evidence-visual evidence-${project.accent} ${compact ? 'is-compact' : ''}`} aria-hidden="true">
    <div className="evidence-grid" />
    <div className="evidence-orbits"><i/><i/><i/></div>
    <div className="evidence-top"><span>HCC / CASE {project.id}</span><span>{project.signal}</span></div>
    <Icon className="evidence-icon" />
    <div className="evidence-chart"><i/><i/><i/><i/><i/><i/><i/><i/></div>
    <div className="evidence-nodes"><i/><i/><i/><i/></div>
    <div className="evidence-bottom"><span>LIVE SYSTEM</span><b>0{index + 1}</b></div>
  </div>
}
