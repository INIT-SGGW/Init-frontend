export interface Member {
    name: string,
    position: string,
    team: string,
    photo?: string,
    profiles: {
        linkedin?: string,
        facebook?: string,
        github?: string,
        instagram?: string
    }
}