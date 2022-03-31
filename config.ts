
export interface Contact{
    value:string;
    url?:string;
}

export interface Link {
    name: string
    icon: string
    link: string
}

export interface Project {
    name: string
    description: string;
    banner?:string;
    tryItLink?: string;
    links?: Link[]
}

export interface Social {
    icon: string
    name: string
    value: string
}

export interface Config {
    name: string;
    pfp: string;
    icon: string;
    banner: string;
    bio: string;
    projects: Project[];
    socialMedia: Social[];

    // it can be just the value oooor with some cool stuff
    contacts: {[name:string]:Contact|string};
    paypalMe:string;
}





const config: Config = {
    name: "Haouari Haitam Kouider",
    pfp: "https://avatars.githubusercontent.com/u/57036855?s=300&v=4",
    icon: "https://avatars.githubusercontent.com/u/57036855?s=20&v=4",
    banner: "/img/banner.png",

    bio: "I believe in delivering features using elegant syntax, and a clean code base for future changes.",

    projects: [
        {
            name: "Golang templating tool",
            description: "it's a simple engine that's used for discord bots for templating users info and levels into a graphical image",
            banner:"/img/golangtemplatorBanner.png",
            
            // tryItLink: "sdf",
            links: [
                {
                    name: "github",
                    icon: "/icon/github-light.png",
                    link: "https://github.com/haouarihk/goImgTemplator"
                }
            ]
        },
      
    ],


    socialMedia: [
        {
            icon: "/icon/github-light.png",
            name: "Github",
            value: "https://github.com/haouarihk"
        },
        {
            icon: "/icon/linkedIn.png",
            name: "LinkedIn",
            value: "https://www.linkedin.com/in/haithem-haouari-09392b58"
        }
    ],

    contacts:{
        email: "haouarihk@gmail.com"
    },
    paypalMe:"haouarihk@gmail.com"
}

export default config