export const getRoute=(route: string)=>{
    switch (route.toLowerCase()) {
        case "home":
            return "/home"
        case "about":
            return "/about";
        case "contact":
            return "/contact";
        case "login":
            return "/login";       
        default:
            return "/";
    }
}