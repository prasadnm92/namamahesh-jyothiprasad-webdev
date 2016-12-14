(function() {
    angular
        .module("MyProfile")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $mdDialog) {
        var vm=this;

        function init(){
            vm.currentYear = (new Date()).getFullYear();
            vm.work_experience = [
                {
                    company: "TetraScience",
                    position: "Software Engineer Co-op",
                    duration: "Jan. - Sept. 2016",
                    tasks: [
                        "Worked with the business team and the client to integrate new instruments with the cloud platform",
                        "Owned the project to partner with a new manufacturer to design and develop the end-to-end functionality of on-boarding their product, being the point of contact between the customer and the developing team",
                        "Performed rigorous testing on the proprietary hardware module by testing and building test frameworks on Atlassian’s TestRail",
                        "Improved development environment by configuring and setting up Vagrant for Linux environment",
                        "Increased the data capture rate and thus the efficiency of the firmware software by reducing the latency by 25%"
                    ]
                },
                {
                    company: "Indian Institute of Science",
                    position: "Research Intern",
                    duration: "Apr. - July 2014",
                    tasks: [
                        "Achieved an efficient and lightweight program for remote temperature sensing with Raspberry Pi running python and sqlite3",
                        "Accomplished project completion 2 weeks before deadline by collaborating with the on-site team"
                    ]
                },
                {
                    company: "Sharp Software Development India",
                    position: "Software Engineer Intern",
                    duration: "Jan. - Feb. 2013",
                    tasks: [
                        "A first hand experience at the current technologies like the Surface computing systems",
                        "Developed object recognition (and comparison) applications, file transfer through Bluetooth® technology using C#/.NET"
                    ]
                },
                {
                    company: "Sunfra Technologies",
                    position: "Software Developer Intern",
                    duration: "Aug. - Nov. 2012",
                    tasks: [
                        "Integrated with the Web Development department and actively involved in an E-Commerce website development project to build an online grocery store (www.payatdoor.com)",
                        "Responsibilities included designing the look and feel of the website using HTML, CSS and JavaScript"
                    ]
                }
            ];
            vm.education = [
                {
                    university: "Northeastern University",
                    degree: "Master of Science in Computer Science",
                    logo: "neu.png",
                    relevantCourses: {
                        id: "edu1courses",
                        data: ["Web Development", "Information retrieval", "Algorithms", "Database Management Systems",
                            "Computer Networks", "Network Security"]
                    }
                },
                {
                    university: "Bangalore Institute Of Technology",
                    degree: "Bachelor of Engineering in Computer Science",
                    logo: "bit.png",
                    relevantCourses: {
                        id: "edu2courses",
                        data: ["Data Structures", "Design and Analysis of Algorithms", "Introduction to Databases",
                        "Discrete Mathematical Structures", "Programming the Web", "Java and J2EE", "Information and Network Security"]
                    },
                    awards: {
                        id: "edu2awards",
                        data: ["Second Best Paper at 8th National Conference on 'Recent Trends in Computer Science and Engineering'",
                            "Official Record Holder in INDIA BOOK OF RECORDS (and more) for participating in the Largest and Longest Information Security marathon globally"]
                    }
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
                    tech_subtitle: "",
                    tech_logo: "mean.png",
                    name: "Wifi Loc8r",
                    project_logo: "wifiLoc8r.jpg",
                    link:"http://vast-fjord-43915.herokuapp.com/#/"
                },
                {
                    technology: "Spring MVC",
                    tech_subtitle: "JAVA 8",
                    tech_logo: "spring.png",
                    name: "Event Management System",
                    project_logo: "ems.jpg",
                    link:"https://github.com/prasadnm92/Event-Management-System"
                },
                {
                    technology: "Python",
                    tech_subtitle: "SOLite3",
                    tech_logo: "sqlite_python.png",
                    name: "Content Deliver Network",
                    project_logo: "cdn.jpg",
                    link:"https://github.com/prasadnm92/fundamentalsOfComputerNetworks/tree/master/Content%20Delivery%20Network"
                },
                {
                    technology: "JAVA",
                    tech_subtitle: "",
                    tech_logo: "java.png",
                    name: "Crawler, Ranking and Indexer",
                    project_logo: "crawler.jpg",
                    link:"https://github.com/prasadnm92/informationRetrieval"
                },
                {
                    technology: "JAVA",
                    tech_subtitle: "JSP, Servlets",
                    tech_logo: "java-j2ee.jpg",
                    name: "Virtual Hospital",
                    project_logo: "virtual-hospital.jpg",
                    link:"https://github.com/prasadnm92/virtualHospital"
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
                        {logo:"spring.png", alt:"Spring MVC"},
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