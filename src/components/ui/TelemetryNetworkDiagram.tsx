import { motion, useReducedMotion } from 'motion/react'
import VisualDiagramFrame from './VisualDiagramFrame'

const telemetryProcessSteps = [
  { id: '01', title: 'CONNECT', copy: 'Remote infrastructure' },
  { id: '02', title: 'ENABLE', copy: 'Real-time monitoring' },
  { id: '03', title: 'IMPROVE', copy: 'Service delivery' },
  { id: '04', title: 'BUILD', copy: 'A more enabled district' },
]

export default function TelemetryNetworkDiagram() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="telemetry-diagram-container"
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: shouldReduceMotion ? 0.25 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <VisualDiagramFrame
        id="diagram-09"
        number="09"
        title="TELEMETRY NETWORK"
        subtitle="Connecting infrastructure across regions."
        imageSrc="/diagrams/diagram_telemetry-network.webp"
        imageAlt="Hybrid Control regional telemetry network connecting reservoir, pump station, water treatment works and control centre"
        aspectRatio="1085 / 362"
        footer={
          <div className="telemetry-process-row">
            {telemetryProcessSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="telemetry-process-step"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : index * 0.06 }}
              >
                <div className="step-indicator">
                  <span className="step-dot" aria-hidden="true" />
                  <strong>{step.title}</strong>
                </div>
                <p>{step.copy}</p>
              </motion.div>
            ))}
          </div>
        }
      />
    </motion.div>
  )
}
