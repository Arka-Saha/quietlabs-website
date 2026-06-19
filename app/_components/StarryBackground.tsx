import React from 'react'

const StarryBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const mousePosRef = React.useRef({ x: 0, y: 0 })
  const starsRef = React.useRef<Array<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; radius: number; offset: number }>>([])
  const timeRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Generate smooth floating stars
    if (starsRef.current.length === 0) {
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        starsRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 0.8 + 0.7,
          offset: Math.random() * Math.PI * 2,
        })
      }
    }

    const animate = () => {
      timeRef.current += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'

      const stars = starsRef.current
      const mousePos = mousePosRef.current
      const flowX = (mousePos.x / canvas.width - 0.5) * 10
      const flowY = (mousePos.y / canvas.height - 0.5) * 10

      stars.forEach((star) => {
        const driftX = Math.sin(timeRef.current * 0.35 + star.offset) * 6
        const driftY = Math.cos(timeRef.current * 0.4 + star.offset) * 6

        // Slow autonomous base movement
        star.vx += Math.cos(timeRef.current * 0.12 + star.offset) * 0.01
        star.vy += Math.sin(timeRef.current * 0.13 + star.offset) * 0.01
        star.vx *= 0.98
        star.vy *= 0.98

        star.baseX += star.vx
        star.baseY += star.vy

        if (star.baseX < 0) star.baseX = canvas.width
        if (star.baseX > canvas.width) star.baseX = 0
        if (star.baseY < 0) star.baseY = canvas.height
        if (star.baseY > canvas.height) star.baseY = 0

        const distance = Math.sqrt(
          Math.pow(mousePos.x - star.baseX, 2) +
          Math.pow(mousePos.y - star.baseY, 2)
        )

        const influence = Math.max(0, 1 - distance / 250) * 0.2

        star.x = star.baseX + driftX + flowX * influence
        star.y = star.baseY + driftY + flowY * influence

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw minimal lines between closest pairs
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
      ctx.lineWidth = 0.8

      for (let i = 0; i < stars.length; i++) {
        let closest = null
        let closestDist = 150

        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < closestDist) {
            closest = j
            closestDist = distance
          }
        }

        if (closest !== null) {
          ctx.beginPath()
          ctx.moveTo(stars[i].x, stars[i].y)
          ctx.lineTo(stars[closest].x, stars[closest].y)
          ctx.stroke()
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}


export default StarryBackground