'use server'
let anonymousUsers: string[] = []

export function getAnonymousUsers() {
    return anonymousUsers
}

export function addNewUser(newUser: string) {
    anonymousUsers = [...anonymousUsers]
}
