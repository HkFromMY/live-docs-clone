import React from 'react'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'

const Document = () => {
  return (
    <div>
      <Header>
        <div className="flex items-center justify-center gap-2">
          <p className="document-title">Fake doc title</p>
        </div>
      </Header>
      <Editor />
    </div>
  )
}

export default Document
