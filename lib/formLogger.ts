import fs from 'fs'
import path from 'path'
import type { SubmissionEntry } from '@/types'

const DATA_DIR  = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'submissions.json')

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ entries: [] }, null, 2), 'utf-8')
  }
}

export async function logSubmission(entry: SubmissionEntry): Promise<void> {
  ensureDataFile()

  const raw  = fs.readFileSync(DATA_FILE, 'utf-8')
  const json = JSON.parse(raw) as { entries: SubmissionEntry[] }

  json.entries.push(entry)

  fs.writeFileSync(DATA_FILE, JSON.stringify(json, null, 2), 'utf-8')
}

export async function readSubmissions(): Promise<SubmissionEntry[]> {
  ensureDataFile()

  const raw  = fs.readFileSync(DATA_FILE, 'utf-8')
  const json = JSON.parse(raw) as { entries: SubmissionEntry[] }

  return json.entries
}
