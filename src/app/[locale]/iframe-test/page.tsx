'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Locale } from '../../../../i18n/config'

// 添加动态加载标记，防止静态预渲染
export const dynamic = 'force-dynamic'

export default function IframeTestPage() {
  // 在组件顶层调用useParams，但不立即使用它
  const params = useParams()
  
  // 默认值作为后备方案
  const [locale, setLocale] = useState<Locale>('zh-cn')
  const [url, setUrl] = useState('https://character-sample-project.netlify.app/')
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showLoadSuccess, setShowLoadSuccess] = useState(false)
  
  // 使用useEffect以确保在客户端运行时安全地访问params
  useEffect(() => {
    if (params && typeof params.locale === 'string') {
      setLocale(params.locale as Locale)
    }
  }, [params])
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setIframeLoaded(false)
    setShowLoadSuccess(false)
    setError(null)
  }
  
  const handleIframeLoad = () => {
    setIframeLoaded(true)
    setShowLoadSuccess(true)
    setError(null)
    
    // 2秒后隐藏成功提示
    setTimeout(() => {
      setShowLoadSuccess(false)
    }, 2000)
  }
  
  const handleIframeError = () => {
    setError(locale === 'zh-cn' ? '无法加载iframe内容' : 'Failed to load iframe content')
    setIframeLoaded(false)
    setShowLoadSuccess(false)
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {locale === 'zh-cn' ? 'Iframe 嵌入测试' : 'Iframe Embedding Test'}
      </h1>
      
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          {locale === 'zh-cn' ? '要嵌入的URL:' : 'URL to embed:'}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="flex-1 p-2 border rounded"
            placeholder="https://example.netlify.app"
          />
          <button 
            onClick={() => {
              setIframeLoaded(false)
              setShowLoadSuccess(false)
              setError(null)
              setTimeout(() => {
                const iframe = document.getElementById('test-iframe') as HTMLIFrameElement
                if (iframe) {
                  iframe.src = iframe.src // 重新加载iframe
                }
              }, 100)
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {locale === 'zh-cn' ? '刷新' : 'Refresh'}
          </button>
        </div>
      </div>
      
      <div className="border rounded p-2 bg-gray-50">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-medium">
            {locale === 'zh-cn' ? 'iframe 嵌入结果:' : 'iframe Embedding Result:'}
          </h2>
          <div>
            {showLoadSuccess ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {locale === 'zh-cn' ? '加载成功' : 'Loaded Successfully'}
              </span>
            ) : error ? (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                {error}
              </span>
            ) : !iframeLoaded && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {locale === 'zh-cn' ? '加载中...' : 'Loading...'}
              </span>
            )}
          </div>
        </div>
        
        <div className="h-[600px] border rounded bg-white relative">
          {!iframeLoaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
          <iframe
            id="test-iframe"
            src={url}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-pointer-lock"
            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi"
          ></iframe>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h3 className="font-medium mb-2">
          {locale === 'zh-cn' ? '测试结果:' : 'Test Results:'}
        </h3>
        <div className="space-y-2">
          {iframeLoaded && (
            <div className="text-green-600">
              ✅ {locale === 'zh-cn' 
                ? `成功嵌入 ${url}` 
                : `Successfully embedded ${url}`}
            </div>
          )}
          {error && (
            <div className="text-red-600">
              ❌ {error}
            </div>
          )}
          <div>
            <strong>{locale === 'zh-cn' ? '注意:' : 'Note:'}</strong> {' '}
            {locale === 'zh-cn' 
              ? '某些网站可能会设置 X-Frame-Options 或 Content-Security-Policy 来阻止被嵌入。'
              : 'Some websites may set X-Frame-Options or Content-Security-Policy to prevent embedding.'}
          </div>
        </div>
      </div>
    </div>
  )
}