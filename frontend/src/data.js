export const divisions = [
  ['flyweight', 'Flyweight', 125], ['bantamweight', 'Bantamweight', 135],
  ['featherweight', 'Featherweight', 145], ['lightweight', 'Lightweight', 155],
  ['welterweight', 'Welterweight', 170], ['middleweight', 'Middleweight', 185],
  ['light-heavyweight', 'Light Heavyweight', 205], ['heavyweight', 'Heavyweight', 265],
].map(([slug, name, limit_lbs], index) => ({ id: index + 1, slug, name, limit_lbs }))

const raw = [
  ['Alex Volkan','The Great','featherweight',true,null,'Australia','AU','27-4-0',36,'5\'6"','71.5"','Orthodox',13,3,'#e4b83d'],
  ['Diego Lopes','','featherweight',false,2,'Brazil','BR','26-7-0',30,'5\'11"','72.5"','Orthodox',10,12,'#47b6b2'],
  ['Ilia Topuria','El Matador','lightweight',true,null,'Spain','ES','17-0-0',28,'5\'7"','69"','Orthodox',7,8,'#e6d35c'],
  ['Arman Tsarukyan','Ahalkalakets','lightweight',false,1,'Armenia','AM','22-3-0',28,'5\'7"','72.5"','Orthodox',9,5,'#7898e8'],
  ['Islam Makhachev','','welterweight',true,null,'Russia','RU','27-1-0',33,'5\'10"','70.5"','Southpaw',5,13,'#d8b45b'],
  ['Shavkat Rakhmonov','Nomad','welterweight',false,2,'Kazakhstan','KZ','19-0-0',30,'6\'1"','77"','Orthodox',8,11,'#57a3d8'],
  ['Dricus Du Plessis','Stillknocks','middleweight',true,null,'South Africa','ZA','23-2-0',31,'6\'1"','76"','Switch',9,11,'#e1bd45'],
  ['Khamzat Chimaev','Borz','middleweight',false,1,'UAE','AE','14-0-0',31,'6\'2"','75"','Orthodox',6,6,'#ce5555'],
  ['Magomed Ankalaev','','light-heavyweight',true,null,'Russia','RU','21-1-1',33,'6\'3"','75"','Southpaw',11,0,'#d6ba55'],
  ['Alex Pereira','Poatan','light-heavyweight',false,1,'Brazil','BR','12-3-0',37,'6\'4"','79"','Orthodox',10,0,'#e05b47'],
  ['Tom Aspinall','','heavyweight',true,null,'England','GB','15-3-0',32,'6\'5"','78"','Orthodox',12,3,'#d8bc59'],
  ['Ciryl Gane','Bon Gamin','heavyweight',false,2,'France','FR','13-2-0',35,'6\'4"','81"','Orthodox',6,3,'#678ed0'],
  ['Alexandre Pantoja','The Cannibal','flyweight',true,null,'Brazil','BR','29-5-0',35,'5\'5"','68"','Orthodox',8,11,'#d9bd54'],
  ['Joshua Van','The Fearless','flyweight',false,2,'Myanmar','MM','14-2-0',23,'5\'5"','65"','Orthodox',6,2,'#5fa4bc'],
  ['Merab Dvalishvili','The Machine','bantamweight',true,null,'Georgia','GE','19-4-0',34,'5\'6"','68"','Orthodox',3,1,'#d6b84e'],
  ["Sean O'Malley",'Suga','bantamweight',false,1,'USA','US','18-2-0',30,'5\'11"','72"','Switch',12,1,'#d65d98'],
]

export const demoFighters = raw.map((f, i) => ({
  id: i + 1, name: f[0], nickname: f[1], weight_class: f[2], is_champion: f[3], rank: f[4],
  country: f[5], country_code: f[6], record: f[7], age: f[8], height: f[9], reach: f[10],
  stance: f[11], wins_by_ko: f[12], wins_by_submission: f[13], accent: f[14],
  weight_lbs: divisions.find(d => d.slug === f[2]).limit_lbs,
}))

