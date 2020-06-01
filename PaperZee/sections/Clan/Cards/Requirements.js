import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Card from '~sections/Shared/Card';
import {ClanRequirementsConverter} from '../Data';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import font from '~sections/Shared/font';

export default function UserActivityDash({ game_id, scale: s = 1 }) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var selected_theme = useSelector(i=>i.theme);
  var [reward,setReward] = React.useState(false);
  var darkBG = undefined;
  var level_colors = {
    ind: "#ffe97f",
    bot: "#dff77e",
    gro: "#b0fc8d",
    0:   "#eb0000",
    1:   "#ef6500",
    2:   "#fa9102",
    3:   "#fcd302",
    4:   "#bfe913",
    5:   "#55f40b",
    null:"#e3e3e3",
    border: '#000a'
  }
  if(selected_theme.includes('dark')) {
    darkBG = theme.page_content.bg;
    level_colors.border = "#fffa"
  }
  var unformatted_requirements = useAPIRequest({
    endpoint: 'clan/v2/requirements',
    data: {clan_id:1349,game_id}
  })
  var unformatted_rewards = useAPIRequest({
    endpoint: 'clan/rewards/v1',
    data: {
      game_id
    },
    cuppazee: true
  })
  var data = ClanRequirementsConverter(unformatted_requirements,unformatted_rewards);
  var tick = useSelector(i => i.tick)
  if (!unformatted_requirements?.battle) {
    if (!unformatted_requirements) {
      return (
        <Card>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color={theme.page_content.fg} />
          </View>
        </Card>
      )
    } else {
      return (
        <Card cardStyle={{backgroundColor:theme.error.bg}}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color:theme.error.fg}}>An Error Occurred</Text>
          </View>
        </Card>
      );
    }
  }
  return (
    // <View style={{ flex: 1, alignItems: "stretch", flexDirection: "column", backgroundColor: "#e9ffdc"??"#e6fcd9", borderRadius: 8 }}>
    <Card noPad>
      <View style={{ ...(darkBG?{borderBottomWidth: 2*s, borderBottomColor: level_colors.border}:{}), backgroundColor: (theme.clanCardHeader||theme.navigation).bg, paddingHorizontal: 8*s, borderTopLeftRadius: 8*s, borderTopRightRadius: 8*s, flexDirection: "row", alignItems: "center" }}>
        <View style={{flex:1,paddingVertical:8*s}}>
          <Text style={{ color: (theme.clanCardHeader||theme.navigation).fg, ...font("bold"), fontSize: 12*s, opacity: 0.7, lineHeight: 12*s }}>{data?.battle.title.slice(10)}</Text>
          <Text style={{ color: (theme.clanCardHeader||theme.navigation).fg, ...font("bold"), fontSize: 16*s, lineHeight: 16*s }}>{reward?'Rewards':'Requirements'}</Text>
        </View>
        <TouchableRipple style={{borderRadius:24*s,padding:4*s}} onPress={()=>{setReward(!reward)}}>
          <MaterialCommunityIcons name="gift" size={24*s} color={(theme.clanCardHeader||theme.navigation).fg} />
        </TouchableRipple>
      </View>
      {data?.levels?.length>0&&<View style={{flexDirection:"row"}}>
        <ScrollView horizontal={true} style={{flex:1}} contentContainerStyle={{flexDirection:"row",minWidth:'100%',paddingLeft:55*s}}>
          {!reward&&<>
          <View style={{flexDirection:"column",flexGrow:1,alignItems:"stretch",backgroundColor:darkBG??level_colors.ind}}>
            <View style={{height:24*s,padding:4*s}}><Text style={{textAlign:"center",...font("bold"),fontSize:12*s,color:darkBG&&level_colors.ind}}>Individual</Text></View>
            <View style={{flexDirection:"row"}}>
              {(data?.order?.individual??[]).map(i=><View key={`Individual${i}`} style={{flexGrow:1}}>
                <View style={{height:(96-19)*s,borderBottomWidth:2*s,borderBottomColor:level_colors.border,padding:4*s,alignItems:"center"}}>
                  <Image source={{uri:data?.requirements?.[i]?.icon??data?.requirements?.[i]?.icons?.[tick%data?.requirements?.[i]?.icons?.length]}} style={{height:36*s,width:36*s}} />
                  <Text numberOfLines={1} style={{color:darkBG&&level_colors.ind,textAlign:"center",...font("bold"),fontSize:12*s}}>{data?.requirements?.[i]?.top}</Text>
                  <Text numberOfLines={1} style={{color:darkBG&&level_colors.ind,textAlign:"center",...font(),fontSize:12*s}}>{data?.requirements?.[i]?.bottom}</Text>
                </View>
                {data?.levels?.map(l=><View key={l.id} style={{marginHorizontal:-1,height:24*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[l.id]}}>
                  <Text style={{textAlign:"center",width:'100%',fontSize:12*s,color:darkBG&&level_colors[l.id],...font()}}>{l.individual?.[i]?.toLocaleString()}</Text>
                </View>)}
              </View>)}
            </View>
          </View>

          <View style={{flexDirection:"column",flexGrow:1,alignItems:"stretch",backgroundColor:darkBG??level_colors.gro}}>
            <View style={{height:24*s,padding:4*s}}><Text style={{textAlign:"center",...font("bold"),fontSize:12*s,color:darkBG&&level_colors.gro}}>Group</Text></View>
            <View style={{flexDirection:"row",marginRight:1}}>
              {data?.order?.group?.map(i=><View style={{flexGrow:1}}>
                <View style={{height:(96-19)*s,borderBottomWidth:2*s,borderBottomColor:level_colors.border,padding:4*s,alignItems:"center"}}>
                  <Image source={{uri:data?.requirements?.[i]?.icon??data?.requirements?.[i]?.icons?.[tick%data?.requirements?.[i]?.icons?.length]}} style={{height:36*s,width:36*s}} />
                  <Text style={{color:darkBG&&level_colors.gro,textAlign:"center",width:'100%',...font("bold"),fontSize:12*s}}>{data?.requirements?.[i]?.top}</Text>
                  <Text style={{color:darkBG&&level_colors.gro,textAlign:"center",width:'100%',...font(),fontSize:12*s}}>{data?.requirements?.[i]?.bottom}</Text>
                </View>
                {data?.levels?.map(l=><View style={{marginHorizontal:-1*s,height:24*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[l.id]}}>
                  <Text style={{color:darkBG&&level_colors[l.id],textAlign:"center",width:'100%',...font(),fontSize:12*s}}>{l.group?.[i]}</Text>
                </View>)}
              </View>)}
            </View>
          </View>
          </>}

          {reward&&<View style={{flexDirection:"column",flexGrow:1,alignItems:"stretch",backgroundColor:darkBG??level_colors.ind}}>
            <View style={{height:24*s,padding:4*s}}><Text style={{textAlign:"center",...font("bold"),fontSize:12*s,color:darkBG&&level_colors.ind}}>Rewards</Text></View>
            <View style={{flexDirection:"row",marginRight:1}}>
              {(data?.order?.rewards??[]).map(i=><View key={`Reward${i}`} style={{flexGrow:1}}>
                <View style={{height:60,borderBottomWidth:2,borderBottomColor:level_colors.border,padding:4,alignItems:"center"}}>
                  <Image source={{uri:data?.rewards?.[i]?.logo}} style={{height:36*s,width:36*s}} />
                  <Text numberOfLines={1} style={{textAlign:"center",...font("bold"),fontSize:10*s,color:darkBG&&level_colors.ind}}>{data?.rewards?.[i]?.short_name??data?.rewards?.[i]?.name.replace(/Virtual /,'V').replace(/Physical /,'P').replace(/Flat /,'').replace(/ Mystery/,'').replace(/THE /,'').replace(/ Wheel/,'W').replace(/Hammock/,'Hamm')}</Text>
                </View>
                {data?.levels?.map(l=><View key={l.id} style={{marginHorizontal:-1*s,height:24*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[l.id]}}>
                  <Text style={{textAlign:"center",width:'100%',fontSize:12*s,color:darkBG&&level_colors[l.id],...font()}}>{l.rewards?.[i]?.toLocaleString()}</Text>
                </View>)}
              </View>)}
            </View>
          </View>}
        </ScrollView>


        <View style={{width:56*s,position:"absolute",left:0,top:0,borderRightWidth:2*s,borderRightColor:level_colors.border}}>
          <View style={{height:24*s,backgroundColor:darkBG??level_colors.null,padding:4*s}}><Text style={{...font("bold"),fontSize:12*s,color:darkBG&&level_colors.null}}>{data?.battle?.title?.slice(10)?.split(' ')?.[0]?.slice(0,3)} {data?.battle?.title?.slice(10)?.split(' ')?.[1]?.slice(2)}</Text></View>
          <View style={{height:(reward?60:77)*s,backgroundColor:darkBG??level_colors.null,flexDirection:"row",alignItems:"center",padding:4*s,borderBottomWidth:2*s,borderBottomColor:level_colors.border}}>
            <Text numberOfLines={1} ellipsizeMode="head" style={{fontSize:12*s,color:darkBG&&level_colors.null,...font()}}>Levels</Text>
          </View>
          {(data?.levels??[]).map(i=><View style={{backgroundColor:darkBG??level_colors[i.id],padding:4*s,height:24*s}} key={i.name}>
            <Text style={{fontSize:12*s,color:darkBG&&level_colors[i.id],...font()}}>{i.name}</Text>
          </View>)}
        </View>
      </View>}
      {unformatted_requirements&&data?.levels?.length===0&&<Text style={{color:theme.page_content.fg,padding:8*s}}>These Clan Requirements are not out yet... wait until {data?.battle?.reveal_at?.toLocaleString?.()} and then press the refresh button in the top-right corner</Text>}
    </Card>
    // </View>
  );
}