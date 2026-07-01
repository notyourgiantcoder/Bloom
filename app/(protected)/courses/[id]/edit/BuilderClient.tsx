'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  MdVisibility, MdFormatBold, MdFormatItalic, 
  MdFormatUnderlined, MdFormatListBulleted, MdFormatListNumbered, 
  MdAddPhotoAlternate, MdCode, MdUpload, MdDeleteForever,
  MdClose, MdArrowBack
} from 'react-icons/md'
import { Course, RenderJob, Module } from '@/types/database'
import { useAutosave } from '@/hooks/useAutosave'
import { useRealtimeJob } from '@/hooks/useRealtimeJob'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client'
import { ModuleManager } from '@/components/ModuleManager'

export function BuilderClient({ 
  initialCourse, 
  initialModules
}: { 
  initialCourse: Course
  initialModules: Module[]
}) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  // --- Course State ---
  const [title, setTitle] = useState(initialCourse.title || 'Untitled Course')
  const [description, setDescription] = useState(initialCourse.description || '')
  const [pdfUrl, setPdfUrl] = useState<string | null>(initialCourse.pdf_url)
  const [status, setStatus] = useState(initialCourse.status)
  const [coverUrl, setCoverUrl] = useState<string | null>(initialCourse.cover_url ?? null)
  
  // --- Autosave ---
  const [saveStatus, setSaveStatus] = useAutosave(
    { title, description, pdf_url: pdfUrl, status },
    initialCourse.id,
    1500
  )

  // --- PDF Upload State ---
  const [isUploadingPdf, setIsUploadingPdf] = useState(false)
  const [pdfUploadProgress, setPdfUploadProgress] = useState(0)

  // --- Video Upload State ---
  const [videoUrl, setVideoUrl] = useState<string | null>(initialCourse.video_url)
  const [isUploadingVideo, setIsUploadingVideo] = useState(false)
  const [videoUploadProgress, setVideoUploadProgress] = useState(0)
  const [videoUploadError, setVideoUploadError] = useState<string | null>(null)

  // --- Cover Upload State ---
  const [isUploadingCover, setIsUploadingCover] = useState(false)

  // --- Content Editor State ---
  const [content, setContent] = useState(initialCourse.content || '')
  const editorRef = useRef<HTMLDivElement>(null)

  // --- Preview Modal State ---
  const [showPreview, setShowPreview] = useState(false)

  // --- Actions ---
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || file.type !== 'application/pdf') return

    setIsUploadingPdf(true)
    setPdfUploadProgress(10)

    try {
      const fileName = `${initialCourse.id}-${Date.now()}.pdf`
      
      const { error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(fileName, file)
        
      setPdfUploadProgress(50)
      if (uploadError) throw uploadError

      setPdfUploadProgress(80)
      const { data: signedData, error: signedError } = await supabase.storage
        .from('pdfs')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10)

      if (signedError) throw signedError

      setPdfUploadProgress(100)
      setPdfUrl(signedData.signedUrl)
    } catch (err: any) {
      alert(`Failed to upload PDF: ${err.message}`)
    } finally {
      setIsUploadingPdf(false)
      setPdfUploadProgress(0)
    }
  }

  const handleDeleteCourse = async () => {
    if (confirm("Delete this course? This cannot be undone.")) {
      await supabase.from('courses').delete().eq('id', initialCourse.id)
      router.push('/courses')
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validTypes = ['video/mp4', 'video/quicktime', 'video/webm']
    if (!validTypes.includes(file.type)) return

    setIsUploadingVideo(true)
    setVideoUploadProgress(10)
    setVideoUploadError(null)

    try {
      const fileName = `${initialCourse.user_id}/${initialCourse.id}/lesson.mp4`
      
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file, { upsert: true })
        
      setVideoUploadProgress(50)
      if (uploadError) throw uploadError

      setVideoUploadProgress(80)
      const { data: signedData, error: signedError } = await supabase.storage
        .from('videos')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10)

      if (signedError) throw signedError

      setVideoUploadProgress(100)
      
      const newVideoUrl = signedData.signedUrl
      const { error: updateError } = await supabase
        .from('courses')
        .update({ video_url: newVideoUrl })
        .eq('id', initialCourse.id)

      if (updateError) throw updateError
      
      setVideoUrl(newVideoUrl)
    } catch (err: any) {
      setVideoUploadError("Upload failed. Try again.")
    } finally {
      setIsUploadingVideo(false)
      setVideoUploadProgress(0)
    }
  }

  const handleRemoveVideo = async () => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ video_url: null })
        .eq('id', initialCourse.id)
      if (error) throw error
      setVideoUrl(null)
    } catch (err: any) {
      alert("Failed to remove video")
    }
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Please upload SVG, PNG, JPG, or WebP files only.')
      return
    }

    setIsUploadingCover(true)
    try {
      const ext = file.name.split('.').pop() || 'jpg'
      const fileName = `${initialCourse.user_id}/${initialCourse.id}/cover.${ext}`
      
      const { error: uploadError } = await supabase.storage
        .from('covers')
        .upload(fileName, file, { upsert: true })
        
      if (uploadError) throw uploadError

      const { data: signedData, error: signedError } = await supabase.storage
        .from('covers')
        .createSignedUrl(fileName, 60 * 60 * 24 * 365 * 10)

      if (signedError) throw signedError

      const newCoverUrl = signedData.signedUrl
      const { error: updateError } = await supabase
        .from('courses')
        .update({ cover_url: newCoverUrl })
        .eq('id', initialCourse.id)

      if (updateError) throw updateError
      
      setCoverUrl(newCoverUrl)
    } catch (err: any) {
      alert(`Failed to upload cover: ${err.message}`)
    } finally {
      setIsUploadingCover(false)
    }
  }

  const handleRemoveCover = async () => {
    try {
      const { error } = await supabase
        .from('courses')
        .update({ cover_url: null })
        .eq('id', initialCourse.id)
      if (error) throw error
      setCoverUrl(null)
    } catch (err: any) {
      alert("Failed to remove cover")
    }
  }

  // --- Toolbar formatting actions ---
  const execFormat = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }, [])

  // --- Content change handler ---
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      setContent(html)
      // Save content to DB
      supabase
        .from('courses')
        .update({ content: html })
        .eq('id', initialCourse.id)
        .then(({ error }) => {
          if (error) console.error('Failed to save content:', error)
        })
    }
  }, [initialCourse.id, supabase])

  // --- Render Helpers ---
  const renderSaveIndicator = () => {
    switch (saveStatus) {
      case 'editing':
        return <span className="text-gray-500">Editing...</span>
      case 'saving':
        return <span className="text-yellow-600">Saving...</span>
      case 'saved':
        return <span className="text-green-600">Saved ✓</span>
      case 'error':
        return <span className="text-red-500">Save failed, retrying...</span>
      default:
        return <span className="text-gray-400">All changes saved</span>
    }
  }

  // --- Preview Modal ---
  const renderPreviewModal = () => {
    if (!showPreview) return null

    return (
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
          {/* Preview Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#E8E0D5]">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowPreview(false)}
                className="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
              >
                <MdArrowBack className="text-[20px]" />
              </button>
              <h2 className="font-label-md text-label-md text-primary">Course Preview</h2>
            </div>
            <button 
              onClick={() => setShowPreview(false)}
              className="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant"
            >
              <MdClose className="text-[20px]" />
            </button>
          </div>

          {/* Preview Body */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12">
            <div className="max-w-[720px] mx-auto">
              {/* Cover Image */}
              {coverUrl && (
                <div className="mb-8 rounded-xl overflow-hidden border border-[#E8E0D5]">
                  <img src={coverUrl} alt="Course cover" className="w-full h-[200px] object-cover" />
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {title || 'Untitled Course'}
              </h1>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6 text-sm text-outline-variant">
                <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {status}
                </span>
                <span>Created {new Date(initialCourse.created_at).toLocaleDateString()}</span>
              </div>

              {/* Description */}
              {description && (
                <p className="text-lg text-on-surface-variant mb-8 leading-relaxed border-l-4 border-primary/20 pl-4 italic">
                  {description}
                </p>
              )}

              {/* Video */}
              {videoUrl && (
                <div className="mb-8">
                  <h3 className="font-medium text-on-surface mb-3">Course Video</h3>
                  <video src={videoUrl} controls className="w-full rounded-xl border border-[#E8E0D5]" />
                </div>
              )}

              {/* Content */}
              {content ? (
                <div 
                  className="prose prose-lg max-w-none text-on-surface"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="text-center py-12 text-outline-variant">
                  <p className="text-lg">No content written yet.</p>
                  <p className="text-sm mt-2">Go back to the editor and start writing your course content.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-md overflow-hidden h-screen flex flex-col relative w-full">
      <div 
        className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(45,95,93,0.15)_0%,rgba(123,160,91,0.05)_100%)] rounded-full blur-[60px] z-0 pointer-events-none top-[-10%] left-[-10%]"
        style={{ animation: 'bloomPulse 4s linear infinite' }}
      ></div>

      {/* TopNavBar */}
      <header className="bg-surface docked full-width top-0 sticky z-50 shadow-sm transition-colors">
        <div className="flex justify-between items-center w-full px-margin-desktop py-4 max-w-container-max mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-headline-md font-headline-md font-bold text-primary">Bloom</Link>
            <span className="text-outline-variant">|</span>
            <span className="font-body-md text-on-surface-variant">Course Builder</span>
          </div>
          {/* Global Nav Context */}
          <nav className="hidden md:flex gap-8 items-center font-label-md text-label-md">
            <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link>
          </nav>
          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="font-label-md text-label-sm text-outline-variant mr-4">
              {renderSaveIndicator()}
            </div>
            <button 
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 text-primary font-label-md text-label-sm border border-primary/30 px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <MdVisibility className="text-[18px]" />
              Preview
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace (3 Panel Layout) */}
      <main className="flex-1 flex overflow-hidden w-full max-w-[1600px] mx-auto bg-surface-container-lowest relative z-10 border-t border-[#E8E0D5]">
        
        {/* Left Panel: Course Outline Tree */}
        <aside className="w-80 border-r border-[#E8E0D5] bg-surface-container-lowest flex flex-col h-full flex-shrink-0 z-20">
          <div className="flex-1 min-h-0 overflow-hidden">
            <ModuleManager 
              courseId={initialCourse.id} 
              initialModules={initialModules}
              onSaveIndicatorChange={setSaveStatus}
            />
          </div>
          <div className="p-4 border-t border-[#E8E0D5] bg-surface-container-low mt-auto">
            <div className="flex items-center justify-between text-label-sm font-label-sm text-outline-variant">
              <span>Status: {status === 'published' ? 'Published' : 'Draft'}</span>
              <span>{saveStatus === 'saved' ? 'Saved' : 'Not saved'}</span>
            </div>
          </div>
        </aside>

        {/* Center Panel: Rich Text Editor Canvas */}
        <section className="flex-1 flex flex-col min-w-0 bg-surface-container-lowest relative z-10">
          {/* Formatting Toolbar */}
          <div className="h-14 border-b border-[#E8E0D5] bg-white flex items-center px-6 gap-6 flex-shrink-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              <select 
                className="bg-transparent border-none text-body-md font-body-md text-on-surface focus:ring-0 cursor-pointer p-0 pr-6 outline-none"
                onChange={(e) => {
                  const val = e.target.value
                  if (val === 'p') {
                    execFormat('formatBlock', 'p')
                  } else {
                    execFormat('formatBlock', val)
                  }
                }}
              >
                <option value="p">Normal text</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
              </select>
            </div>
            <div className="w-px h-6 bg-[#E8E0D5]"></div>
            
            <div className="flex items-center gap-1">
              <button onClick={() => execFormat('bold')} className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors" title="Bold"><MdFormatBold className="text-[20px]" /></button>
              <button onClick={() => execFormat('italic')} className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors" title="Italic"><MdFormatItalic className="text-[20px]" /></button>
              <button onClick={() => execFormat('underline')} className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors" title="Underline"><MdFormatUnderlined className="text-[20px]" /></button>
            </div>
            
            <div className="flex items-center gap-1">
              <button onClick={() => execFormat('insertUnorderedList')} className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors" title="Bullet List"><MdFormatListBulleted className="text-[20px]" /></button>
              <button onClick={() => execFormat('insertOrderedList')} className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors" title="Numbered List"><MdFormatListNumbered className="text-[20px]" /></button>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={() => {
                  const url = prompt('Enter image URL:')
                  if (url) execFormat('insertImage', url)
                }}
                className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors flex items-center gap-1 pr-3"
                title="Insert Media"
              >
                <MdAddPhotoAlternate className="text-[20px]" />
                <span className="font-label-sm text-xs">Media</span>
              </button>
              <button 
                onClick={() => {
                  execFormat('formatBlock', 'pre')
                }}
                className="p-1.5 rounded hover:bg-surface-container text-on-surface transition-colors flex items-center gap-1 pr-3"
                title="Code Block"
              >
                <MdCode className="text-[20px]" />
                <span className="font-label-sm text-xs">Block</span>
              </button>
            </div>
          </div>
          {/* Editor Canvas */}
          <div className="flex-1 overflow-y-auto custom-scroll p-8 md:p-12">
            <div className="max-w-[720px] mx-auto">
              <input 
                className="w-full bg-transparent border-none text-display-lg font-display-lg text-primary placeholder:text-outline-variant focus:ring-0 p-0 mb-4 outline-none" 
                placeholder="Course Title..." 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea 
                className="w-full bg-transparent border-none text-body-lg font-body-lg text-on-surface-variant placeholder:text-outline-variant focus:ring-0 p-0 mb-8 outline-none resize-none" 
                placeholder="Course description..." 
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
              {/* Editable Content Area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleContentChange}
                className="min-h-[300px] outline-none text-body-lg font-body-lg text-on-surface leading-relaxed prose prose-lg max-w-none [&:empty]:before:content-['Start_writing_your_course_content_here...'] [&:empty]:before:text-outline-variant/50 [&:empty]:before:pointer-events-none focus:border-transparent"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </section>

        {/* Right Panel: Lesson Settings */}
        <aside className="hidden xl:flex w-80 border-l border-[#E8E0D5] bg-surface-container-lowest flex-col h-full flex-shrink-0 z-20">
          <div className="p-4 border-b border-[#E8E0D5] bg-white sticky top-0">
            <h2 className="font-label-md text-label-md text-primary tracking-wide">COURSE SETTINGS</h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-8">
            
            {/* Course Material (PDF) */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Course Material (PDF)</label>
              {pdfUrl ? (
                <div className="flex flex-col gap-2 p-3 bg-surface-container-low border border-[#E8E0D5] rounded-lg">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-xl">📄</span>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate text-sm">
                      {pdfUrl.split('/').pop()?.split('?')[0] || 'course_material.pdf'}
                    </a>
                  </div>
                  <button 
                    onClick={() => setPdfUrl(null)} 
                    className="text-xs text-error hover:text-error/80 px-2 py-1 self-start"
                  >
                    Remove PDF
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#E8E0D5] rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-surface transition-colors cursor-pointer">
                  {isUploadingPdf ? (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs text-outline-variant">Uploading {pdfUploadProgress}%</p>
                    </div>
                  ) : (
                    <>
                      <input 
                        type="file" 
                        accept=".pdf" 
                        id="pdf-upload" 
                        className="hidden" 
                        onChange={handlePdfUpload} 
                      />
                      <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center gap-2 w-full">
                        <MdUpload className="text-xl text-outline-variant" />
                        <span className="text-label-sm text-primary font-medium">Upload PDF</span>
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Visibility */}
            <div className="space-y-3 border-t border-[#E8E0D5] pt-6">
              <label className="block font-label-md text-label-md text-on-surface">Visibility</label>
              <div className="bg-surface-container-low rounded-lg p-1 flex border border-[#E8E0D5]">
                <button 
                  onClick={() => setStatus('published')}
                  className={`flex-1 py-1.5 text-label-sm font-label-sm transition-colors rounded-md ${status === 'published' ? 'bg-white shadow-[0_1px_4px_rgba(26,46,46,0.06)] text-primary' : 'text-outline-variant hover:text-primary'}`}
                >
                  Published
                </button>
                <button 
                  onClick={() => setStatus('draft')}
                  className={`flex-1 py-1.5 text-label-sm font-label-sm transition-colors rounded-md ${status === 'draft' ? 'bg-white shadow-[0_1px_4px_rgba(26,46,46,0.06)] text-primary' : 'text-outline-variant hover:text-primary'}`}
                >
                  Draft
                </button>
              </div>
            </div>

            {/* Access Level */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Access Level</label>
              <select className="w-full bg-white border border-[#E8E0D5] rounded-lg px-3 py-2 text-body-md font-body-md text-on-surface-variant outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors" defaultValue="Paid Members Only">
                <option>Free Preview</option>
                <option value="Paid Members Only">Paid Members Only</option>
                <option>Premium Tier</option>
              </select>
            </div>

            {/* Course Video Upload */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Course Video</label>
              {videoUrl ? (
                <div className="flex flex-col gap-2">
                  <video 
                    src={videoUrl} 
                    className="w-full h-[140px] object-cover rounded-xl border border-[#E8E0D5]" 
                    controls 
                    muted 
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-on-surface truncate">
                      {videoUrl.split('/').pop()?.split('?')[0]?.substring(0, 24)}...
                    </span>
                    <div className="flex gap-4">
                      <label htmlFor="video-replace" className="text-xs text-primary hover:underline cursor-pointer">
                        Replace Video
                      </label>
                      <input 
                        type="file" 
                        accept="video/mp4,video/quicktime,video/webm" 
                        id="video-replace" 
                        className="hidden" 
                        onChange={handleVideoUpload} 
                      />
                      <button 
                        onClick={handleRemoveVideo} 
                        className="text-xs text-error hover:underline"
                      >
                        Remove Video
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-2 border-dashed border-[#E8E0D5] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-surface transition-colors cursor-pointer group">
                    {isUploadingVideo ? (
                      <div className="flex flex-col items-center gap-2 w-full">
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs text-outline-variant">Uploading {videoUploadProgress}%</p>
                      </div>
                    ) : (
                      <>
                        <input 
                          type="file" 
                          accept="video/mp4,video/quicktime,video/webm" 
                          id="video-upload" 
                          className="hidden" 
                          onChange={handleVideoUpload} 
                        />
                        <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center gap-2 w-full">
                          <span className="text-3xl text-outline-variant group-hover:text-primary transition-colors">▶</span>
                          <span className="text-label-md text-primary font-medium mt-2">Upload Video</span>
                          <span className="text-xs text-outline-variant">MP4, MOV, WebM (max 2GB)</span>
                        </label>
                      </>
                    )}
                  </div>
                  {videoUploadError && (
                    <div className="flex items-center justify-between bg-red-50 text-red-600 text-xs px-3 py-2 rounded">
                      <span>{videoUploadError}</span>
                      <label htmlFor="video-upload-retry" className="cursor-pointer font-medium hover:underline">
                        Try Again
                      </label>
                      <input 
                        type="file" 
                        accept="video/mp4,video/quicktime,video/webm" 
                        id="video-upload-retry" 
                        className="hidden" 
                        onChange={handleVideoUpload} 
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Course Cover Upload */}
            <div className="space-y-3">
              <label className="block font-label-md text-label-md text-on-surface">Course Cover</label>
              {coverUrl ? (
                <div className="flex flex-col gap-2">
                  <div className="rounded-xl overflow-hidden border border-[#E8E0D5]">
                    <img src={coverUrl} alt="Course cover" className="w-full h-[120px] object-cover" />
                  </div>
                  <div className="flex gap-4">
                    <label htmlFor="cover-replace" className="text-xs text-primary hover:underline cursor-pointer">
                      Replace Image
                    </label>
                    <input 
                      type="file" 
                      accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp" 
                      id="cover-replace" 
                      className="hidden" 
                      onChange={handleCoverUpload} 
                    />
                    <button 
                      onClick={handleRemoveCover} 
                      className="text-xs text-error hover:underline"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#E8E0D5] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-surface transition-colors cursor-pointer group">
                  {isUploadingCover ? (
                    <div className="flex flex-col items-center gap-2 w-full">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs text-outline-variant">Uploading cover...</p>
                    </div>
                  ) : (
                    <>
                      <input 
                        type="file" 
                        accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp" 
                        id="cover-upload" 
                        className="hidden" 
                        onChange={handleCoverUpload} 
                      />
                      <label htmlFor="cover-upload" className="cursor-pointer flex flex-col items-center gap-2 w-full">
                        <MdUpload className="text-xl text-outline-variant group-hover:text-primary transition-colors" />
                        <span className="text-label-md text-primary font-medium">Upload Image</span>
                        <span className="text-xs text-outline-variant">SVG, PNG, JPG (max. 800x400px)</span>
                      </label>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Danger Zone */}
            <div className="pt-6 border-t border-[#E8E0D5]">
              <button onClick={handleDeleteCourse} className="w-full flex justify-center items-center gap-2 py-2 text-label-md font-label-md text-error hover:bg-error-container/20 rounded-lg transition-colors border border-transparent hover:border-error/30">
                <MdDeleteForever className="text-[18px]" />
                Delete Course
              </button>
            </div>
          </div>
        </aside>

      </main>

      {/* Preview Modal */}
      {renderPreviewModal()}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bloomPulse {
            0% { transform: scale(1.0); opacity: 0.7; }
            50% { transform: scale(1.04); opacity: 1.0; }
            100% { transform: scale(1.0); opacity: 0.7; }
        }
        .custom-scroll::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background-color: rgba(112, 121, 120, 0.2);
            border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  )
}
