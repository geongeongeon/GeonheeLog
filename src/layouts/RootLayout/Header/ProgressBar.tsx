import styled from "@emotion/styled"
import { useEffect, useState } from "react"

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const post = document.getElementById("post-content")
    if (!post) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const postTop = post.offsetTop
      const postHeight = post.scrollHeight
      const windowHeight = window.innerHeight

      const scrollableHeight = Math.max(postHeight - windowHeight, 1)
      let percent = ((scrollY - postTop) / scrollableHeight) * 100
      percent = Math.min(Math.max(percent, 0), 100)

      // 글이 화면보다 짧으면 ProgressBar 100% 표시
      if (postHeight <= windowHeight) {
        percent = 100
      }

      setProgress(percent)
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
  position: absolute; /* sticky 대신 absolute로 Header 전체에 붙음 */
  bottom: 0;          /* Header 맨 아래 */
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 1001;
`

const ProgressFill = styled.div`
  height: 100%;
  width: 0%;
  background: "#ff8c00";
  transition: width 0.3s ease-out;
`