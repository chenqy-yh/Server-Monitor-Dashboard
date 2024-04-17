/*
 * @Date: 2024-04-06 00:22:47
 * @LastEditors: Chenqy
 * @LastEditTime: 2024-04-17 12:45:12
 * @FilePath: \Spirit-client\src\renderer\src\store\permission\index.ts
 * @Description: True or False
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

type Role = 'tourist' | 'user'
type Permission = 'login' | 'instances' | 'detail' | 'setting'

const usePermissionStore = defineStore('permission', () => {
  // ----------------- C O N S T A N T ----------------- //

  const role_map = ref<Record<Role, Permission[]>>({
    tourist: ['login', 'setting'],
    user: ['instances', 'detail', 'setting']
  })

  const role_list = ref<Role[]>(['tourist'])

  const getRoleList = () => {
    return role_list.value
  }
  const setRoleList = (new_role_list: Role[]) => {
    role_list.value = new_role_list
  }
  const addRoleList = (new_role_list: Role[]) => {
    role_list.value = Array.from(new Set([...role_list.value, ...new_role_list]))
  }
  const getPermissionsFromRoles = (role_list: Role[]) => {
    return role_list.reduce((acc, cur) => {
      return acc.concat(role_map.value[cur])
    }, [] as Permission[])
  }

  const getCurAllPermissions = () => {
    return role_list.value.reduce((acc, cur) => {
      return acc.concat(role_map.value[cur])
    }, [] as Permission[])
  }

  return {
    role_list,
    getRoleList,
    setRoleList,
    addRoleList,
    getPermissionsFromRoles,
    getCurAllPermissions
  }
})

export { usePermissionStore }
export type { Role, Permission }
