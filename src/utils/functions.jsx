const methods = {

  levelToVol: (level) => {
      let result
        if (level < 983) {
            result = 10
        } else
        if (level >= 983 && level <= 984){
            result = 200000
            } else 
        if (level >= 984 && level <= 984.4){
            result = 300000
            } else 
            if (level >= 984.5 && level <= 985){
            result = 400000
            } else 
            if (level >= 985.1 && level <= 985.4){
            result = 450000
            } else 
            if (level >= 985.5 && level <= 986){
            result = 500000
            } else 
            if (level >= 986.1 && level <= 986.4){
            result = 600000
            } else 
            if (level >= 986.5 && level <= 987){
            result = 700000
            } else 
            if (level >= 987.1 && level <= 987.4){
            result = 800000
            } else 
            if (level >= 987.5 && level <= 988){
            result = 850000
            } else 
            if (level >= 988.1 && level <= 988.4){
            result = 900000
            } else 
            if (level >= 988.5 && level <= 989){
            result = 950000
            } else 
            if (level >= 989.1 && level <= 989.4){
            result = 970000
            } else 
            if (level >= 989.5 && level <= 990){
            result = 1000000
            } else 
            if (level >= 990.1 && level <= 990.4){
            result = 1100000
            } else 
            if (level >= 990.5 && level <= 991){
            result = 1300000
            } else 
            if (level >= 991.1 && level <= 991.4){
            result = 1500000
            } else 
            if (level >= 991.5 && level <= 992){
            result = 1700000
            } else 
            if (level >= 992.1 && level <= 992.4){
            result = 1900000
            } else 
            if (level >= 992.5 && level <= 993){
            result = 1990000
            } else 
            if (level >= 993.1 && level <= 993.4){
            result = 2000000
            } else 
            if (level >= 993.5 && level <= 994){
            result = 2200000
            } else 
            if (level >= 994.1 && level <= 994.4){
            result = 2400000
            } else 
            if (level >= 994.5 && level <= 995){
            result = 2500000
            } else 
            if (level >= 995.1 && level <= 995.4){
            result = 2900000
            } else 
            if (level >= 995.5 && level <= 996){
            result = 3000000
            } else 
            if (level >= 996.1 && level <= 996.4){
            result = 3400000
            } else 
            if (level >= 996.5 && level <= 997){
            result = 3600000
            } else 
            if (level >= 997.1 && level <= 997.4){
            result = 3800000
            } else 
            if (level >= 997.5 && level <= 998){
            result = 4000000
            } else 
            if (level >= 998.1 && level <= 998.4){
            result = 4200000
            } else 
            if (level >= 998.5 && level <= 999){
            result = 4500000
            } else 
            if (level >= 999.1 && level <= 999.4){
            result = 4700000
            } else 
            if (level >= 999.5 && level <= 1000){
            result = 5000000
            } else 
            if (level >= 1000.1 && level <= 1000.4){
            result = 5500000
            } else 
            if (level >= 1000.5 && level <= 1001){
            result = 5700000
            } else 
            if (level >= 1001.1 && level <= 1001.4){
            result = 6200000
            } else 
            if (level >= 1001.5 && level <= 1002){
            result = 6500000
            } else 
            if (level >= 1002.1 && level <= 1002.4){
            result = 7000000
            } else 
            if (level >= 1002.5 && level <= 1003){
            result = 7200000
            } else 
            if (level >= 1003.1 && level <= 1003.4){
            result = 8000000
            } else 
            if (level >= 1003.5 && level <= 1004){
            result = 8200000
            } else 
            if (level >= 1004.1 && level <= 1004.4){
            result = 9000000
            } else 
            if (level >= 1004.5 && level <= 1005){
            result = 9200000
            } else 
            if (level >= 1005.1 && level <= 1005.4){
                result = 10000000
                } else 
            if (level >= 1005.5 && level <= 1006){
            result = 10200000
            } else 
            if (level >= 1006.1 && level <= 1006.4){
            result = 10600000
            } else 
            if (level >= 1006.5 && level <= 1007){
            result = 11900000
            } else 
            if (level >= 1007.1 && level <= 1007.4){
            result = 12000000
            } else 
            if (level >= 1007.5 && level <= 1008){
            result = 13000000
            } else 
            if (level >= 1008.1 && level <= 1008.4){
            result = 13200000
            } else 
            if (level >= 1008.5 && level <= 1008.9){
            result = 13800000
            } else 
            if (level >= 1009 && level <= 1009.1){
            result = 14000000
            } else 
            if (level >= 1009.2 && level <= 1009.4){
            result = 14500000
            } else 
            if (level >= 1009.5 && level <= 1010){
            result = 15000000
            } else 
            if (level >= 1010.1 && level <= 1010.4){
            result = 15500000
            } else 
            if (level >= 1010.5 && level <= 1011){
            result = 16000000
            } else 
            if (level >= 1011.1 && level <= 1011.4){
            result = 17000000
            } else 
            if (level >= 1011.5 && level <= 1011.9){
            result = 17500000
            } else 
            if (level >= 1012 && level <= 1012.4){
            result = 18000000
            } else 
            if (level >= 1012.5 && level <= 1013){
            result = 19000000
            } else 
            if (level >= 1013.1 && level <= 1013.4){
            result = 20000000
            } else 
            if (level >= 1013.5 && level <= 1014){
            result = 20500000
            } else 
            if (level >= 1014.1 && level <= 1014.4){
            result = 21500000
            } else 
            if (level >= 1014.5 && level <= 1015){
            result = 22000000
            } else 
            if (level >= 1015.1 && level <= 1015.6){
            result = 23600000
            } else 
            if (level >= 1015.6 && level <= 1016){
            result = 23600000
            }
    return result
  },
  volToPerc: (volume) => {
      
      return ((volume / 23600000)* 100).toFixed(2)
  }
}


export default {
  methods
}


