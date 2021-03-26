import Vue from 'vue'
import Router from 'vue-router'
import store from './store/index'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: 'notFoundPage',
            component: () => import('./views/NotFoundPage')
        },
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home'),
        },
        {
            path: '/districts',
            name: 'districts',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/Districts')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login')
        },
        {
            path: '/school/:school',
            name: 'school',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/School'),
        },
        {
            path: '/schoolcard/:card',
            name: 'schoolcard',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/SchoolCard'),
        },
        {
            path: '/schoolbuilding/:build',
            name: 'schoolbuilding',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/SchoolBuilding'),
        },
        {
            path: '/create_building/:build',
            name: 'CreateBuilding',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/CreateBuilding'),
        },
        {
            path: '/building/:id',
            name: 'Building',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/Building'),
        },
        {
            path: '/buildingcard/:card',
            name: 'BuildingCard',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/BuildingCard'),
        },
        {
            path: '/create_school',
            name: 'CreateSchool',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/CreateSchool'),
        },
        {
            path: '/update_school_info/:inn',
            name: 'UpdateInfo',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/UpdateInfo'),
        },
        {
            path: '/update_contact_info/:inn',
            name: 'UpdateContacts',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/UpdateContacts'),
        },
        {
            path: '/update_requisite_info/:inn',
            name: 'UpdateRequisites',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/UpdateRequisites'),
        },
        {
            path: '/temperature/:id',
            name: 'Temperature',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/Temperature'),
        },
        {
            path: '/documents/:id',
            name: 'Documents',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/Documents'),
        },
        {
            path: '/documents',
            name: 'AllDocuments',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/AllDocuments'),
        },
        {
            path: '/prescriptions/:id',
            name: 'Prescriptions',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/Prescriptions'),
        },
        {
            path: '/prescriptions',
            name: 'AllPrescriptions',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/AllPrescriptions'),
        },
        {
            path: '/orders/:id',
            name: 'Orders',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/Orders'),
        },
        {
            path: '/orders',
            name: 'AllOrders',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/AllOrders'),
        },
        {
            path: '/create_order/:id',
            name: 'CreateOrder',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/CreateOrder'),
        },
        {
            path: '/create_prescription/:id',
            name: 'CreatePrescription',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/CreatePrescription'),
        },
        {
            path: '/update_prescription/:source/:id',
            name: 'CreatePrescription',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/UpdatePrescription'),
        },
        {
            path: '/characteristic/:id',
            name: 'BuildingСharacteristic',
            meta: {
                requiresAuth: true
            },
            component: () => import('./views/BuildingСharacteristic.vue'),
            children: [
                {
                    path: 'construction',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('./views/characteristic/construction/Construction'),
                    children: [
                        {
                            path: 'roof',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Roof')
                        },
                        {
                            path: 'facade',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Facade')
                        },
                        {
                            path: 'foundation',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Foundation')
                        },
                        {
                            path: 'interfloor_overlaps',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Interfloor_overlaps')
                        },
                        {
                            path: 'attic_overlaps',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Attic_overlaps')
                        },
                        {
                            path: 'basement_overlaps',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Basement_overlaps')
                        },
                        {
                            path: 'blind_area',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Blind_area')
                        },
                        {
                            path: 'window',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/construction/Window')
                        }
                    ]
                },
                {
                    path: 'engineering',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('./views/characteristic/construction/Construction'),
                    children: [
                        {
                            path: 'heat_supply',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/engineering/Heat_supply')
                        },
                        {
                            path: 'water_supply',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/engineering/Water_supply')
                        },
                        {
                            path: 'power_supply',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/engineering/Power_supply')
                        },
                        {
                            path: 'drainage_supply',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/engineering/Drainage_supply')
                        }

                    ]
                },
                {
                    path: 'indoors',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('./views/characteristic/construction/Construction'),
                    children: [
                        {
                            path: 'administrative',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Administrative')
                        },
                        {
                            path: 'auditorium',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Auditorium')
                        },
                        {
                            path: 'bathroom',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Bathroom')
                        },
                        {
                            path: 'corridors',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Corridors')
                        },
                        {
                            path: 'evacuation_exits',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Evacuation_exits')
                        },
                        {
                            path: 'food_block',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Food_block')
                        },
                        {
                            path: 'gym',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Gym')
                        },
                        {
                            path: 'laundry',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Laundry')
                        },
                        {
                            path: 'pantry',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Pantry')
                        },
                        {
                            path: 'training_rooms',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/indoors/Training_rooms')
                        }
                    ]
                },
                {
                    path: 'security',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('./views/characteristic/construction/Construction'),
                    children: [
                        {
                            path: 'fire_alarm',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/security/Fire_alarm')
                        },
                        {
                            path: 'smoke_exhaust',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/security/Smoke_exhaust')
                        },
                        {
                            path: 'cctv',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/security/CCTV')
                        }
                    ]
                },
                {
                    path: 'land_improvement',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('./views/characteristic/construction/Construction'),
                    children: [
                        {
                            path: 'landscaping',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/land_improvement/Landscaping')
                        },
                        {
                            path: 'asphalt',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/land_improvement/Asphalt')
                        },
                        {
                            path: 'fencing',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/land_improvement/Fencing')
                        },
                        {
                            path: 'waste_container',
                            meta: {
                                requiresAuth: true
                            },
                            component: () => import('./views/characteristic/land_improvement/Waste_container')
                        }
                    ]
                },
                {
                    path: 'sports_facility',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('./views/characteristic/Sports_facility')
                },
                {
                    path: 'accessible_environment',
                    meta: {
                        requiresAuth: true
                    },
                    component: () => import('./views/characteristic/Accessible_environment')
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login?message=login')
    } else {
        next()
    }
})

export default router