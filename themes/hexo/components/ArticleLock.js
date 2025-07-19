import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'

/**
 * 加密文章校验组件 - 修复版
 */
export const ArticleLock = ({ password, validPassword }) => {
  const { locale } = useGlobal()
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const passwordInputRef = useRef(null)

  // 提交密码校验
  const submitPassword = () => {
    // 清空之前的错误提示
    setError('')
    
    // 验证密码
    if (validPassword && !validPassword(inputValue)) {
      setError(locale.COMMON.PASSWORD_ERROR || '密码错误，请重新输入')
      // 输入框抖动动画
      const input = passwordInputRef.current
      if (input) {
        input.classList.add('animate-shake')
        setTimeout(() => input.classList.remove('animate-shake'), 600)
      }
    }
  }

  // 处理键盘回车事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitPassword()
    }
  }

  // 自动聚焦输入框
  useEffect(() => {
    passwordInputRef.current?.focus()
  }, [])

  return (
    <div className="w-full flex justify-center items-center min-h-[300px] p-4 bg-[#F2F8FB]/50">
      <div className="w-full max-w-md bg-white rounded-xl border border-[#B3E0E6]/30 shadow-sm p-6 transition-all duration-300 hover:shadow-md">
        {/* 锁图标 */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F2F8FB] text-[#B3E0E6] mb-4">
            <i className="fas fa-lock text-2xl"></i>
          </div>
          <h3 className="font-medium text-[#2D4B53] text-lg">
            {locale.COMMON.ARTICLE_LOCK_TIPS || '该文章已加密保护'}
          </h3>
        </div>

        {/* 密码输入框 */}
        <div className="flex">
          <input
            id="password"
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={passwordInputRef}
            placeholder={locale.COMMON.ENTER_PASSWORD || '请输入访问密码'}
            className="flex-1 px-4 py-3 text-sm 
                      bg-[#F2F8FB] border border-[#B3E0E6]/30 
                      text-[#2D4B53] rounded-l-md 
                      focus:outline-none focus:border-[#B3E0E6] 
                      focus:ring-1 focus:ring-[#B3E0E6]
                      transition-all duration-200"
          />
          <button
            onClick={submitPassword}
            className="px-5 py-3 whitespace-nowrap 
                      bg-[#B3E0E6] hover:bg-[#8EC1C8] 
                      text-[#2D4B53] font-medium text-sm
                      rounded-r-md transition-all duration-200
                      flex items-center"
          >
            <i className="fas fa-key mr-2"></i>
            {locale.COMMON.SUBMIT || '提交'}
          </button>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mt-3 text-center text-[#E57373] text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
