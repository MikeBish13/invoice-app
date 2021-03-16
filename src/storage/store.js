import create from 'zustand';

export const useStore = create(set => ({
    editStatus: false,
    setEditStatus: () => set(state => ({editStatus: !state.editStatus})), 
    addStatus: false,
    setAddStatus: () => set(state => ({addStatus: !state.addStatus})) 
}))

