<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { DataTableColumns } from '~/components/tabletest/TableTypes';

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
const go = () => {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()

const dataRaw = computed(() => [
  {
    name: "Test1",
    progress: 50
  },
  {
    name: "Test2",
    progress: 15
  },
  {
    name: "Test3",
    progress: 38
  },
  {
    name: "Test4",
    progress: 56
  },
  {
    name: "Test5",
    progress: 59
  },
  {
    name: "Test6",
    progress: 89
  }
])

const columns: DataTableColumns = [
  { key: 'name' },
  { key: 'progress', label: 'Hits' },
  { label: 'Status', key: 'progress' }
]

</script>

<template>
  <div>
    <Table
      :rows="dataRaw"
      :columns="columns"
    >
      <template #datatable-tbody-td-2="progressCell">
        <td
          :key="`datatable-tbody-td-${progressCell.uniqueId()}-${
            progressCell.column.label
          }`"
          class="progress-cell"
          :name="progressCell.column.key"
          :data-label="progressCell.column.label"
          :rdata1="progressCell.column"
        >
          <progress max="100" :value="progressCell.row.progress">
            {{ progressCell.row.progress }}
          </progress>
        </td>
      </template>
    </Table>
    <p class="text-4xl">
      <carbon-campsite class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x-4 y-2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
