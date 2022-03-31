
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
}





const config: Config = {
    name: "Haouari Haitam Kouider",
    pfp: "https://avatars.githubusercontent.com/u/57036855?s=300&v=4",
    icon: "https://avatars.githubusercontent.com/u/57036855?s=20&v=4",
    banner: "/img/banner.png",

    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

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
    }

}

export default config