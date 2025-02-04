import { isAsset, isChunk } from '$src/helpers'
import { getRollupOutput } from '$test/helpers/getRollupOutput'
import { jestSetTimeout } from '$test/helpers/timeout'
import { byFileName } from '$test/helpers/utils'

jestSetTimeout(30000)

test('bundles chunks and assets', async () => {
  const { output } = await getRollupOutput(
    __dirname,
    'rollup.config.js',
  )

  // Chunks
  const chunks = output.filter(isChunk)
  expect(
    chunks.find(byFileName('background/sw.js')),
  ).toBeDefined()
  expect(chunks.length).toBe(1)

  // Assets
  const assets = output.filter(isAsset)
  const manifestAsset = assets.find(byFileName('manifest.json'))!
  expect(manifestAsset).toBeDefined()
  const manifest = JSON.parse(manifestAsset.source as string)
  expect(manifest).toMatchObject({
    background: {
      service_worker: 'background/sw.js',
    },
  })
  expect(assets.length).toBe(1)
})
