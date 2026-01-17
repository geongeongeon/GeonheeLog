import styled from "@emotion/styled"
import { useEffect, useState } from "react"

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const post = document.getElementById("post-content")
    if (!post) return

    let animationFrame: number

    const handleScroll = () => {
      const scrollY = window.scrollY
      const postTop = post.offsetTop
      const postHeight = post.scrollHeight
      const windowHeight = window.innerHeight

      const scrollableHeight = Math.max(postHeight - windowHeight, 1)
      let targetPercent = ((scrollY - postTop) / scrollableHeight) * 100
      targetPercent = Math.min(Math.max(targetPercent, 0), 100)
      if (postHeight <= windowHeight) targetPercent = 100

      // 부드럽게 증가
      const animate = () => {
        setProgress(prev => {
          const diff = targetPercent - prev
          if (Math.abs(diff) < 0.1) return targetPercent
          return prev + diff * 0.1 // 10%씩 이동
        })
        animationFrame = requestAnimationFrame(animate)
      }
      cancelAnimationFrame(animationFrame)
      animate()
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <ProgressContainer>
      <ProgressFill style={{ width: `${progress}%` }} />
    </ProgressContainer>
  )
}

export default ProgressBar

const ProgressContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 1001;
`

const ProgressFill = styled.div`
  height: 100%;
  width: 0%;
  background: #e68a2b;
`