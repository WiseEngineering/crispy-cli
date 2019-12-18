import { assert } from 'chai'

import { getPath } from '../src/migration-schema'

describe('migration-schema', () => {
  describe('getPath()', () => {
    it('should return default directory from config', () => {
      assert.equal(getPath('00_test_migration'), 'migrations/00_test_migration.yml')
    })
  })
})
