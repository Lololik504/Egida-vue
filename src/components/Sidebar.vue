<template>
  <div class="sidebar">
    <ul>
      <li
          v-for="character in characteristicList"
          :key="character.id"
      >
        <q-expansion-item
            style="font-weight: bold"
            v-if="character !== 'Спортивные сооружение/теневые навесы'"
            :label="character"
        >
          <div class="lnk"
              v-for="item in helpList[character].expansionArray"
              :key="item.id"
          >
            <router-link
                v-if="item.children === undefined"
                tag="li"
                :to="`/characteristic/${$route.params['id']}/${helpList[character].name}/${item.path}`"
            >
              {{ item.name }}
            </router-link>
            <div v-else>
              <q-expansion-item
                  :label="item.name"
              >
                <router-link
                    class="item"
                    v-for="child in item.children"
                    tag="li"
                    :key="child.id"
                    :to="`/characteristic/${$route.params['id']}/${helpList[character].name}/${child.path}`"
                >
                  {{ child.name }}
                </router-link>
              </q-expansion-item>
            </div>
          </div>
        </q-expansion-item>
        <router-link
            class="link"
            v-else
            tag="div"
            :to="`/characteristic/${$route.params['id']}/${helpList[character].name}`"
        >
          {{ character }}
        </router-link>
      </li>
      <router-link
          class="link"
          v-if="purposeList.includes(purpose)"
          :to="`/characteristic/${$route.params['id']}/accessible_environment`"
          tag="li"
      >
        Доступная среда
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['purpose'],
  name: "Sidebar",
  data: () => ({
    purposeList: ['Корпус школы', 'Корпус д/с', 'Подразделение доп. образования'],
    characteristicList: [
      'Строительные конструкции',
      'Инженерные коммуникации',
      'Внутренние помещения',
      'Система безопасности',
      'Благоустройство территории',
      'Спортивные сооружение/теневые навесы'
    ],
    helpList: {
      'Строительные конструкции': {
        expansionArray: [
          {
            name: 'Кровля',
            path: 'roof'
          },
          {
            name: 'Фасад',
            path: 'facade'
          },
          {
            name: 'Фундамент',
            path: 'foundation'
          },
          {
            name: 'Перекрытия',
            children: [
              {
                name: 'Межэтажные перекрытия',
                path: 'interfloor_overlaps',
              },
              {
                name: 'Чердачные перекрытия',
                path: 'attic_overlaps',
              },
              {
                name: 'Подвальные перекрытия',
                path: 'basement_overlaps',
              }
            ]
          },
          {
            name: 'Отмостка',
            path: 'blind_area'
          },
          {
            name: 'Окна',
            path: 'window'
          },
        ],
        name: 'construction'
      },
      'Инженерные коммуникации': {
        name: 'engineering',
        expansionArray: [
          {
            name: 'Система отопления, вентиляции и горячего водоснабжения',
            path: 'heat_supply'
          },
          {
            name: 'Система водоснабжения и канализирования',
            path: 'water_supply'
          },
          {
            name: 'Система электроснабжения',
            path: 'power_supply'
          },
          {
            name: 'Система водоотведения поверхностных сточных вод',
            path: 'drainage_supply'
          }
        ]
      },
      'Внутренние помещения': {
        name: 'indoors',
        expansionArray: [
          {
            name: 'Учебные/игровые помещения (классы, игровые, спальни)',
            path: 'training_rooms'
          },
          {
            name: 'Коридоры',
            path: 'corridors'
          },
          {
            name: 'Административные кабинеты',
            path: 'administrative'
          },
          {
            name: 'Пищеблок',
            path: 'food_block'
          },
          {
            name: 'Спортзал',
            path: 'gym'
          },
          {
            name: 'Актовый зал',
            path: 'auditorium'
          },
          {
            name: 'Санузел',
            path: 'bathroom'
          },
          {
            name: 'Прачечная',
            path: 'laundry'
          },
          {
            name: 'Буфетная',
            path: 'pantry'
          },
          {
            name: 'Эвакуационные выходы',
            path: 'evacuation_exits'
          },
          {
            name: 'Бассейны',
            path: 'pool'
          }
        ]
      },
      'Система безопасности': {
        name: 'security',
        expansionArray: [
          {
            name: 'Автоматическая пожарная сигнализация и система оповещения и управления эвакуацией людей (АПС и СОУЭ)',
            path: 'fire_alarm'
          },
          {
            name: 'Система автоматического дымоудаление',
            path: 'smoke_exhaust'
          },
          {
            name: 'Система видеонаблюдение',
            path: 'cctv'
          }
        ]
      },
      'Благоустройство территории': {
        name: 'land_improvement',
        expansionArray: [
          {
            name: 'Озеленение',
            path: 'landscaping'
          },
          {
            name: 'Асфальтовое покрытие',
            path: 'asphalt'
          },
          {
            name: 'Ограждение',
            path: 'fencing'
          },
          {
            name: 'Контейнерная площадка для сбора твердых коммунальных отходов',
            path: 'waste_container'
          }
        ]
      },
      'Спортивные сооружение/теневые навесы': {
        name: 'sports_facility',
        expansionArray: [
          {
            name: '',
            path: ''
          }
        ]
      }
    }
  })
}
</script>

<style scoped>
li {
  padding: 10px 15px;
  border: 1px solid #ddd;
  cursor: pointer;
  font-weight: normal;
}

.lnk li:hover {
  color: blue;
  text-decoration: underline;
}

.link {
  font-weight: bold;
}

.link:hover {
  color: blue;
  text-decoration: underline;
}

.sidebar {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 20%; /* Set the width of the sidebar */
  /*position: fixed; !* Fixed Sidebar (stay in place on scroll) *!*/
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  /*background-color: #111; !* Black *!*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

/* The navigation menu links */
.sidebar a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Style page content */
.main {
  margin-left: 200px; /* Same as the width of the sidebar */
  padding: 0px 10px;
}

.item:last-child {
  margin-bottom: 15px;
}
</style>