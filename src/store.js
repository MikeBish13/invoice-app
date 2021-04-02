import create from 'zustand'

export const useStore = create((set) => ({
    formStatus: '',
    setFormStatus: (formStatus) => set({formStatus}),
    deleteModal: false,
    setDeleteModal: (deleteModal) => set({deleteModal})
}));