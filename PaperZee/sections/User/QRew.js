import * as React from 'react';
import { Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FAB, Menu, TouchableRipple, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getType from 'utils/db/types';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import font from 'sections/Shared/font';
import Card from 'sections/Shared/Card';
import DatePicker from 'sections/Shared/DatePicker';
import useMoment from 'utils/hooks/useMoment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import getIcon from 'utils/db/icon';

function g(a) {
  return getType(a.pin || a.icon || a.pin_icon);
}
// function f(a) {
//   return a.toString().replace(/_/g, '').replace(/munzee/g, '');
// }

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

export default function UserSHCScreen() {
  var moment = useMoment();
  var [FABOpen, setFABOpen] = React.useState(false);
  var [datePickerOpen, setDatePickerOpen] = React.useState(false);
  var logins = useSelector(i => i.logins)
  var nav = useNavigation();
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = false;
  var level_colors = {
    ind: "#ffe97f",
    bot: "#dff77e",
    gro: "#b0fc8d",
    0: "#eb0000",
    1: "#ef6500",
    2: "#fa9102",
    3: "#fcd302",
    4: "#bfe913",
    5: "#55f40b",
    null: "#e3e3e3",
    border: '#000a'
  }
  if (theme.dark) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var route = useRoute();
  if (route.params.date) {
    dateString = route.params.date;
  }
  var user_id = Number(route.params.userid);
  var categories = [
    { icon: 'rainbowunicorn', name: t('shc:pro.tob'), function: i => i?.bouncer?.type == "tob" },
    { icon: 'nomad', name: t('shc:pro.nomad'), function: i => i?.bouncer?.type == "nomad" },
    { icon: 'retiredunicorn', name: t('shc:pro.retire'), function: i => i?.bouncer?.type == "retiremyth" || i?.bouncer?.type == "zombiepouch" },
    { icon: 'yeti', name: t('shc:pro.myth_1'), function: i => i?.myth_set == "original" },
    { icon: 'cyclops', name: t('shc:pro.myth_2'), function: i => i?.myth_set == "classical" },
    { icon: 'mermaid', name: t('shc:pro.myth_3'), function: i => i?.myth_set == "mirror" },
    { icon: 'poseidon', name: t('shc:pro.myth_4'), function: i => i?.myth_set == "modern" },
    { icon: 'tuli', name: t('shc:pro.pc_1'), function: i => i?.category == "pouch_season_1" },
    { icon: 'magnetus', name: t('shc:pro.pc_2'), function: i => i?.category == "pouch_season_2" },
    { icon: 'oniks', name: t('shc:pro.pc_fun'), function: i => i?.category == "pouch_funfinity" },
    { icon: 'tuxflatrob', name: t('shc:pro.flat'), function: i => i?.bouncer?.type == "flat" },
    { icon: 'morphobutterfly', name: t('shc:pro.temp'), function: i => i?.bouncer?.type == "temppob" },
    { icon: 'scattered', name: t('shc:pro.pscatter'), function: i => i?.scatter && i.state == "physical" },
    { icon: 'feather', name: t('shc:pro.vscatter'), function: i => i?.scatter && i.state == "virtual" },
  ]
  const data = useAPIRequest([
    {
      endpoint: 'statzee/player/captures/types',
      data: { user_id },
      function: data=>data
    },
    {
      endpoint: 'statzee/player/deploys/types',
      data: { user_id },
      function: data=>data
    }
  ])
  // if (!category_data) {
  //   if(category_data===undefined) {
  //     return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg}}>
  //       <ActivityIndicator size="large" color={theme.page_content.fg} />
  //     </View>
  //   } else {
  //     return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'#ffaaaa'}}>
  //       <MaterialCommunityIcons name="alert" size={48} color="#d00" />
  //     </View>;
  //   }
  // }
  return <Text>{JSON.stringify(data)}</Text>
  return <View style={{ flex: 1, backgroundColor: theme.page.bg }}>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 8 }}>
      <DateSwitcher dateString={dateString} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {categories.map(i => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View style={{ padding: 8 }}>
                <Image source={getIcon(i?.icon,128)} style={{ width: 36, height: 36 }} />
              </View>
              <View style={{ paddingRight: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{category_data[i.name].length}x {i?.name}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{category_data[i.name].length} / {i.req}</Text>
              </View>
              <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[category_data[i.name].length > 0 ? 5 : 0] : undefined, backgroundColor: dark ? undefined : level_colors[category_data[i.name].length > 0 ? 5 : 0], width: 50, alignItems: "center", justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24, ...font("bold") }}>{category_data[i.name].length > 0 ? '✔' : ''}</Text>
              </View>
            </View>
          </Card>
        </View>)}
      </View>
    </ScrollView>

    <FAB.Group
      open={FABOpen}
      icon={() => <UserIcon size={56} user_id={user_id} />}
      actions={Object.entries(logins).filter(i => i[0] != user_id).slice(0, 5).map(i => ({ icon: () => <UserIcon size={40} user_id={Number(i[0])} />, label: i[1].username, onPress: () => { nav.popToTop(); nav.replace('UserDetails', { userid: Number(i[0]) }) } }))}
      onStateChange={({ open }) => setFABOpen(open)}
    />
  </View>
}