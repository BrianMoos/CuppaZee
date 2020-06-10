import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from '~sections/Shared/font';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import types from '~sections/DB/types.json';
import categories from '~sections/DB/categories.json';
import moment from 'moment';

function g(icon) {
  return decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'').replace(/munzee$/,'');
}

export default function SearchScreen({ route }) {
  var theme = useSelector(i => i.themes[i.theme])
  function hasChild(cat) {
    return !!categories.find(i => i.parents.includes(cat.id));
  }
  var data = useAPIRequest({
    endpoint: 'bouncers/overview/v1',
    cuppazee: true
  })
  function get(icon) {
    return (data||{})[`https://munzee.global.ssl.fastly.net/images/pins/${icon}.png`]||0;
  }
  return (
    <ScrollView
      contentContainerStyle={{ width: 800, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      {[...categories.filter(i=>i.seasonal&&i.seasonal.starts<Date.now()&&i.seasonal.ends>Date.now()),...categories.filter(i => i.parents.includes('bouncer'))].filter(i => !hasChild(i)).filter(i=>!i.hidden).map(cdata=><View style={{ padding: 4 }}>
        <Card noPad>
          <View>
            <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, padding: 4, textAlign: "center" }}>{cdata.name}</Text>
            {cdata?.seasonal && <>
              {/* <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{moment(cdata.seasonal.starts).format('L LT')} - {moment(cdata.seasonal.ends).format('L LT')}</Text>
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>Duration: {moment.duration(moment(cdata.seasonal.starts).diff(moment(cdata.seasonal.ends))).humanize()}</Text>
            </>}
            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
              {types.filter(i => i.category === cdata.id).filter(i=>!i.hidden&&!i.capture_only).map(i => <View key={i.id} style={{ padding: 4, width: 80, alignItems: "center", opacity: get(i.icon)>0?1:0.4 }}>
                <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={{ uri: i.custom_icon ?? `https://server.cuppazee.app/pins/64/${encodeURIComponent(i.icon)}.png` }} />
                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.name}</Text>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{get(i.icon).toString()}</Text>
              </View>)}
            </View>
          </View>
        </Card>
      </View>)}
    </ScrollView>
  );
}
//api.adorable.io/avatars/100