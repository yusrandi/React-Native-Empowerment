export type UserEntity = {
    id: string
    nama: string
    email: string
    role: string
    token: string | null
    
};

export const emptUser: UserEntity = {
    id: "",
    email: "",
    nama: "",
    role: "",
    token: ""
}

