const routes = {
    "Operator": ["/tickets", "/dashboard", "/"],
    "Customer": ["/tickets", "/companies", "/"]
}

export default (to, profileType) => {
    return routes[profileType].includes(to)
}
