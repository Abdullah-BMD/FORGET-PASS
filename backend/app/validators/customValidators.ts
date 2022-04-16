
const emptyFieldValidation = (values: any, keys: Array<string>) => {
    keys.map((key) => {
        if (!values[key]) throw new Error(`${key} is required`)
    })
    return "success"
}

const idValidation = (id: string) => {
    if (!id) throw new Error("id is required")
    else return "success"
}



export {
    emptyFieldValidation,
    idValidation
}