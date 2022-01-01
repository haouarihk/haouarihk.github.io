import { NextPage } from "next";
import List from "../../components/listProjects";
import { Project } from "../../config";



const projects: Project[] = [
    {
        name: "gauss jordan elimination",
        description: "Gauss-Jordan Elimination is an algorithm that can be used to solve systems of linear equations and to find the inverse of any invertible matrix. It relies upon three elementary row operations one can use on a matrix: Swap the positions of two of the rows. Multiply one of the rows by a nonzero scalar.",
        tryItLink: "/submissions/gauss-jordan-elimination",
        banner: "/img/gauss-jordan-elimination.jpg",
        links: [
            {
                name: "github",
                icon: "/icon/github-light.png",
                link: "https://github.com/haouarihk/haouarihk.github.io/tree/master/pages/submissions/gauss-jordan-elimination"
            }
        ]
    },
    {
        name: "Jacobi Method",
        description: "the Jacobi method is an iterative algorithm for determining the solutions of a strictly diagonally dominant system of linear equations. Each diagonal element is solved for, and an approximate value is plugged in. The process is then iterated until it converges. This algorithm is a stripped-down version of the Jacobi transformation method of matrix diagonalization. The method is named after Carl Gustav Jacob Jacobi.",
        tryItLink: "/submissions/jacobi-method",
        banner: "/img/gauss-jordan-elimination.jpg",
        links: [
            {
                name: "github",
                icon: "/icon/github-light.png",
                link: "https://github.com/haouarihk/haouarihk.github.io/tree/master/pages/submissions/jacobi-method"
            }
        ]
    },
    {
        name: "Gauss-Seidel Method",
        description: "the Gauss-Seidel method, also known as the Liebmann method or the method of successive displacement, is an iterative method used to solve a system of linear equations. It is named after the German mathematicians Carl Friedrich Gauss and Philipp Ludwig von Seidel, and is similar to the Jacobi method. Though it can be applied to any matrix with non-zero elements on the diagonals.",
        tryItLink: "/submissions/gauss-sheildi-method",
        banner: "/img/gauss-jordan-elimination.jpg",
        links: [
            {
                name: "github",
                icon: "/icon/github-light.png",
                link: "https://github.com/haouarihk/haouarihk.github.io/tree/master/pages/submissions/gauss-sheildi-method"
            }
        ]
    },
    {
        name: "",
        description: "calculate area of a circle without using pi",
        tryItLink: "/submissions/calculate-area-of-circle-without-pi",
        banner: "/img/gauss-jordan-elimination.jpg",
        links: [
            {
                name: "github",
                icon: "/icon/github-light.png",
                link: "https://github.com/haouarihk/haouarihk.github.io/tree/master/pages/submissions/calculate-area-of-circle-without-pi"
            }
        ]
    },
    {
        name: "Leibnix Series",
        description: "calculate Pi using Leibniz series method",
        tryItLink: "/submissions/leibniz-series",
        banner: "/img/gauss-jordan-elimination.jpg",
        links: [
            {
                name: "github",
                icon: "/icon/github-light.png",
                link: "https://github.com/haouarihk/haouarihk.github.io/tree/master/pages/submissions/leibniz-series"
            }
        ]
    },
]

const Projects: NextPage = () => (
    <main>
        <List projects={projects} />
    </main>
)

export default Projects;