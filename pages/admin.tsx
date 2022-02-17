import dynamic from 'next/dynamic'
import React, { ComponentType } from 'react'
import config from '../cms/config'

interface IInitParams {
  config: Record<string, unknown>
}

interface ICMS {
  init: (params: IInitParams) => ComponentType
}

const initCMS = async (): Promise<ComponentType> => {
  const CMS = (await import('netlify-cms-app')) as unknown as ICMS
  return CMS.init({
    config,
  })
}

const NetlifyCMS = dynamic(initCMS, {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

const AdminPage: React.FC = () => {
  return <NetlifyCMS />
}

export default AdminPage
