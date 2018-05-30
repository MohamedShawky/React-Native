import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';




const startTabs = async()=>{
    let sources = await Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ?'md-map' : 'ios-map', 40),
        Icon.getImageSource(Platform.OS === 'android' ?'md-share-alt' : 'ios-share=alt', 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" : "ios-menu", 30)
        
    ]);
    Navigation.startTabBasedApp({
        tabs: [
            {
                screen: "FindScreenPlace",
                // label: "Find Employee",
                title: "List of Names",
                 icon: sources[0],
                // navigatorButtons: {
                //     leftButtons: [
                //         {
                //             icon: sources[2],
                //             title: "Menu",
                //             id: "sideDrawerToggle"
                //         }
                //     ]
                // }
            },
            // {
            //     screen: "ShareScreenPlace",
            //     label: "Share Place",
            //     title: "Share Place",
            //     icon: sources[1],
            //     navigatorButtons: {
            //         leftButtons: [
            //             {
            //                 icon: sources[2],
            //                 title: "Menu",
            //                 id: "sideDrawerToggle"
            //             }
            //         ]
            //     }
            // }
        ],
        tabsStyle : {
            tabBarSelectedButtonColor : "green"
        },
        // drawer : {
        //     left: {
        //         screen: "SideDrawer"
        //     }

        // },
        appStyle : {
            tabBarSelectedButtonColor : "green"
        }
    });
}

// const mainScreenApp =async()=>{

//    let source = await Promise.all([ 
//         Icon.getImageSource('md-map', 30),
//         Icon.getImageSource('md-map', 20)
//     ]);
//     Navigation.startTabBasedApp({
//         tabs : [
//             {
//                 screen : 'FindScreenPlace',
//                 label : 'FindScreen',
//                 title : 'FindScreen',
//                 icon : source[0]
//             },
//             {
//                 screen : 'ShareScreenPlace',
//                 label : 'ShareScreen',
//                 title : 'ShareScreen',
//                 icon : source[1]
//             }
//         ]
        
//     });   

// }

export default startTabs;