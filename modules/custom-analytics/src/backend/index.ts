import 'bluebird-global'
import * as sdk from 'botpress/sdk'
import _ from 'lodash'

import en from '../translations/en.json'
import fr from '../translations/fr.json'

import api from './api'
import Database from './db'
import setup from './setup'

let db: Database

const interactionsToTrack = ['message', 'text', 'button', 'template', 'quick_reply', 'postback']

const onServerStarted = async (bp: typeof sdk) => {
  db = new Database(bp)
  await setup(bp, db, interactionsToTrack)
}

const onServerReady = async (bp: typeof sdk) => {
  await api(bp, db)
}

const onModuleUnmount = async (bp: typeof sdk) => {
  bp.events.removeMiddleware('custom-analytics.incoming')
  bp.events.removeMiddleware('custom-analytics.outgoing')
  bp.http.deleteRouterForBot('custom-analytics')
}

const entryPoint: sdk.ModuleEntryPoint = {
  onServerStarted,
  onServerReady,
  onModuleUnmount,
  translations: { en, fr },
  definition: {
    name: 'custom-analytics',
    fullName: 'CustomAnalytics',
    homepage: 'https://botpress.com',
    menuIcon: 'timeline-line-chart',
    menuText: 'CustomAnalytics'
  }
}

export default entryPoint
