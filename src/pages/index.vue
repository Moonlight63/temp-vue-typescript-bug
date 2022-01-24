<script setup lang="ts">
import { DataTableColumns } from '~/components/tabletest/TableTypes';

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
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
