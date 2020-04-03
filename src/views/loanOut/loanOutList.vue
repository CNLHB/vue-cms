<template>
    <div>
            <Table :columns="columns8" :data="data7" size="small" ref="table"></Table>
    <br>
    <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
    <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
    <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> Export custom data</Button>
    <Button type="primary" size="large" @click="createList"><Icon type="ios-download-outline"></Icon> Export custom data</Button>

    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns8: [
                    {
                        "title": "年級",
                        "key": "name",
                        "fixed": "left",
                        "width": 150
                    },
                    {
                        "title": "性別",
                        "key": "show",
                        "width": 150,
                        "sortable": true,
                        filters: [
                            {
                                label: 'Greater than 4000',
                                value: 1
                            },
                            {
                                label: 'Less than 4000',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.show > 4000;
                            } else if (value === 2) {
                                return row.show < 4000;
                            }
                        }
                    },
                    {
                        "title": "生活費",
                        "key": "weak",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "感情狀況",
                        "key": "signin",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "戀愛時間",
                        "key": "click",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "戀愛時花費",
                        "key": "active",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "消費在什麼方面",
                        "key": "day7",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "父母给的恋爱费用",
                        "key": "day30",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "是否应该恋爱消费导致生活紧张",
                        "key": "tomorrow",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "金钱会影响恋人之间的关系吗",
                        "key": "day",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "AA制消费怎么样",
                        "key": "week",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "更符合的消费观",
                        "key": "lag",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "恋爱对象的影响因素",
                        "key": "layx",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "那个地区更适合恋爱",
                        "key": "ladq",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "希望的另一半身高",
                        "key": "higt",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "初恋经历",
                        "key": "lajl",
                        "width": 150,
                        "sortable": true
                    },
                    {
                        "title": "恋爱与婚姻关系",
                        "key": "hygx",
                        "width": 150,
                        "sortable": true
                    }
                ],
                data7: [

  
                ]
            }
        },
        methods: {
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            },
            createList()  {
                let arr = []



                for(let i = 0; i< 100; i++ ){
                let name ,fav,show,weak,signin,click,active,day7,day30,tomorrow,
                    day,week,month,lag,layx,ladq,higt,lajl,hygx;
                    let ran = Math.random()
                    if( ran > 0.5){
                        name = 3
                        fav = 1
                        show = 2
                        weak = 1
                        signin= 3




                    }else{
                        fav = 2
                    }
                    
                        if( ran < 0.5&&ran > 0.35){
                            name  = 4
                            show = 1
                            weak = 2
                        }
                        if(ran < 0.35&&ran > 0.20){
                             name  = 2
                             show = 4
                             weak = 3
                        }
                        if(ran > 0&&ran < 0.20){
                              name  = 1
                              show =3
                              weak = 2
                        }

                    arr.push( {
                        "name": name,
                        "fav": fav,
                        "show": show,
                        "weak": weak,
                        "signin": signin,
                        "click": click,
                        "active": active,
                        "day7": day7,
                        "day30": day30,
                        "tomorrow": tomorrow,
                        "day": day,
                        "week": week,
                        "month": month,
                        "lag": lag,
                        "layx":layx,
                        "ladq":ladq,
                        "higt":higt,
                        "lajl": lajl,
                        "hygx":hygx

                    })



                }
                console.log(arr)
                this.data7 = arr
            }     
        }
    }
</script>
