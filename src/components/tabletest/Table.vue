<script setup lang="ts">
import { computed, PropType, defineProps } from 'vue'
import type {
  DataTableRows,
  DataTableColumns,
  DataTableColumn,
} from './TableTypes'

const uniqueId = () => Math.floor(Math.random() * 100)

const props = defineProps({
  rows: { type: Array as PropType<DataTableRows>, required: true },
  columns: { type: Array as PropType<DataTableColumns>, required: true }
})

const tableRows = computed(() => props.rows)

const tableColumns = computed(() => {
  const newArr: Array<{
    key: string,
    label: string,
    sortable: boolean,
    idx: string
  }> = []
  for (const idx in props.columns) {
    const column: DataTableColumn = props.columns[idx]
    if (typeof column === 'string') {
      newArr.push({ idx: idx, key: column.toLowerCase(), label: column[0].toUpperCase() + column.substring(1), sortable: false })
    } else {
      const newObj = { ...column }
      if (!('sortable' in newObj)) {
        newObj.sortable = false
      }
      if (!(newObj.key) && typeof newObj.label === 'string') {
        newObj.key = newObj.label.toLowerCase()
      }
      if (!(newObj.label) && typeof newObj.key === 'string') {
        newObj.label = (newObj.key[0].toUpperCase() + newObj.key.substring(1))
      }
      // Be explict
      newArr.push({
        idx: idx,
        label: newObj.label as string,
        key: newObj.key as string,
        sortable: newObj.sortable as boolean
      })
    }
  }
  return newArr
})

</script>

<template>
  <div class="">
    <table>
      <thead>
        <slot
          name="thead"
          :column="tableColumns"
        >
          <th
            v-for="(column) in tableColumns"
            :key="`datatable-thead-th-${column.label}`"
          >
            {{ column.label }}
          </th>
        </slot>
      </thead>

      <tbody>
        <tr
          v-for="(row, rowIndex) in tableRows"
          :key="`datatable-row-${uniqueId()}-${rowIndex}`"
          :row-index="rowIndex"
        >
          <slot
            name="tbody"
            :index="rowIndex"
            :row="row"
          >
            <slot
              v-for="(column) in tableColumns"
              :name="`datatable-tbody-td-${column.idx}`"
              :column="column"
              :row="row"
              :uniqueId="uniqueId"
            >
              <td
                :key="`datatable-tbody-td-${uniqueId()}-${column.label}`"
                :name="column.key"
                :data-label="column.label"
                v-text="row[column.key]"
              />
            </slot>
          </slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>
