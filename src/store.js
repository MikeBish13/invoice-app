import create from 'zustand'

export const useStore = create((set) => ({
    formStatus: '',
    setFormStatus: (formStatus) => set({formStatus})
}));