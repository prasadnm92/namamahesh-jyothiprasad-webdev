(function() {
    angular
        .module("MyProfile")
        .controller("ProfileController", ProfileController);

    function ProfileController() {
        var vm=this;

        function init(){
            vm.welcome = "Hello World!";
            console.log("controller hello");
            vm.work_experience = [
                {
                    company: "TetraScience",
                    position: "Software Engineer Co-op",
                    duration: "Jan. - Sept. 2016",
                    tasks: [
                        "Developed drivers in Node.js to on-board new lab instruments to the cloud platform",
                        "Owned the project to partner with a new manufacturer to design and develop the end-to- end functionality of on-boarding their product, being the point of contact between the customer and the developing team",
                        "Performed rigorous testing on the proprietary hardware module by testing and building test frameworks on Atlassian’s TestRail",
                        "Improved development environment by configuring and setting up Vagrant for Linux environment",
                        "Increased the data capture rate and thus the efficiency of the firmware software by reducing the latency by 25%"
                    ]
                },
                {
                    company: "Indian Institute of Science",
                    position: "Software Engineer Intern",
                    duration: "Apr. - July 2014",
                    tasks: [
                        "Achieved an efficient and lightweight program for remote temperature sensing with Raspberry Pi running python and sqlite3",
                        "Accomplished project completion 2 weeks before deadline by collaborating with the on-site team"
                    ]
                }
            ];
            vm.education = [
                {
                    university: "Northeastern University",
                    degree: "Master of Science in Computer Science",
                    logo: "neu.png"
                },
                {
                    university: "Visvesvaraya Institute Of Technology",
                    degree: "Bachelor of Engineering in Computer Science",
                    logo: "bit.png"
                }
            ];
            vm.projects = [
                {
                    technology: "MEAN Stack",
                    tech_subtitle: "",
                    tech_logo: "mean.png",
                    name: "Web App Maker",
                    project_logo: "wam.png",
                    link:"assignment/"
                },
                {
                    technology: "MEAN Stack",
                    tech_logo: "mean.png",
                    name: "WorkFrom",
                    project_logo: "",
                    link:"project/"
                }
            ];
            vm.skills = [
                {
                    category: "Programming Languages",
                    items: [
                        {logo:"java.png", alt:"JAVA"},
                        {logo:"javascript.jpg", alt:"JavaScript"},
                        {logo:"python.png", alt:"Python"},
                        {logo:"c.png", alt:"C"},
                        {logo:"cpp.png", alt:"C++"},
                        {logo:"c-sharp.png", alt:"C#"}
                    ]
                },
                {
                    category: "Web Technologies",
                    items: [
                        {logo:"node-js.png", alt:"Node JS"},
                        {logo:"angular-js.png", alt:"Angular JS"},
                        {logo:"java-j2ee.jpg", alt:"J2EE"},
                        {logo:"html5.png", alt:"HTML5"},
                        {logo:"css3.png", alt:"CSS3"},
                        {logo:"jquery.jpg", alt:"jQuery"},
                        {logo:"bootstrap.png", alt:"Bootstrap"},
                        {logo:"express-js.png", alt:"Express JS"},
                        {logo:"restful-api.png", alt:"RESTful API"}
                    ]
                },
                {
                    category: "Systems",
                    items: [
                        {logo:"windows.png", alt:"Windows"},
                        {logo:"linux.png", alt:"Linux"}
                    ]
                },
                {
                    category: "Database",
                    items: [
                        {logo:"mysql.png", alt:"MySQL"},
                        {logo:"oracle-11g.jpg", alt:"Oracle 11g"},
                        {logo:"mongodb.jpg", alt:"MongoDB"},
                        {logo:"postgresql.png", alt:"PostgrSQL"},
                        {logo:"sqlite.png", alt:"SQLite"}
                    ]
                },
                {
                    category: "Software Tools",
                    items: [
                        {logo:"webstorm.png", alt:"WebStorm"},
                        {logo:"netbeans.png", alt:"NetBeans"},
                        {logo:"eclipse.png", alt:"Eclipse"},
                        {logo:"git.png", alt:"GIT"},
                        {logo:"atlassian.png", alt:"Atlassian"},
                        {logo:"jenkins.png", alt:"Jenkins"}
                    ]
                }
            ];
            vm.interests = [
                "Swimming",
                "Dancing",
                "Soccer",
                "Hiking and camping",
                "Cooking"
            ]
        }
        init();

    }
})();