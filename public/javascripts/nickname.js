// Random nickname list
const nicknames = ['Abelard',  'Booker',  'Afton',  'Gytha',  'Ackley',  'Booth',  'Aida',  'Harmony',  'Acton',  'Borden',  'Aldercy',  'Harva',  'Addison',  'Bowman',  'Amaris',  'Haylee',  'Aidan',  'Braden',  'Amberjill',  'Hazel',  'Ailen',  'Bradford',  'Ashley',  'Heather',  'Aland',  'Bradley',  'Audrey',  'Holly',  'Alcott',  'Bramwell',  'Avena',  'Honey',  'Alden',  'Brandon',  'Beccalynn',  'Hope',  'Alder',  'Bray',  'Bethshaya',  'Ida',  'Aldis',  'Brayden',  'Blossom',  'India',  'Aldrich',  'Brennan',  'Blythe',  'Jamie',  'Alfred',  'Brent',  'Brenda',  'Jillian',  'Allard',  'Brett',  'Brook',  'Jocelyn',  'Alvin',  'Brewster',  'Bunny',  'Jonesy',  'Amherst',  'Brigham',  'Burdette',  'Joy',  'Amsden',  'rinley',  'Carling',  'Kaelyn',  'Ansley',  'Brishen',  'Chelsea',  'Kirsten',  'Atherol',  'Brock',  'Claiborne',  'Kismet',  'Atwater',  'Broderick',  'Clovis',  'Kyla',  'twood',  'Bromley',  'Columbia',  'ainey',  'Averill',  'Bronson',  'Corliss',  'Lari',  'Ballard',  'Brown',  'Courtney',  'Lark',  'Bancroft',  'Buck',  'Daralis',  'Leigh',  'Barclay',  'Buckley',  'Dawn',  'Leslie',  'Barden', 'Bud', 'Demelza', 'Liberty', 'Barnett', 'Burgess', 'Devon', 'Lindsay', 'Baron', 'Burle', 'Dooriya', 'Locke', 'Barse', 'urne', 'Dory', 'ove', 'Barton', 'Burt', 'Eartha', 'Luella', 'Baul', 'Burton', 'Easter', 'Maida', 'Bavol', 'Calder', 'Ebony', 'Maitane', 'Beacher', 'Caldwell', 'Edda', 'Mala', 'Beaman', 'Calhoun', 'Edlyn', 'Manhattan', 'Beardsley', 'Calvert', 'Edolie', 'Mercy', 'Bede', 'Carleton', 'Edsel', 'Merry', 'Beldon', 'Carlisle', 'Ella', 'Missy', 'Benson', 'Carlton', 'Ember', 'Misty', 'Bentley', 'Carlyle', 'Ena', 'Nara', 'Benton', 'Carter', 'Erika', 'Neda', 'Bersh', 'Carver', 'Esmeralda', 'Palma', 'Beval', 'Chad', 'Farrah', 'earl', 'Birch', 'Chal', 'Farrah', 'Pebbles', 'Bishop', 'Channing', 'Fern', 'Poppy', 'Blade', 'Chapman', 'Fleta', 'Queen', 'Blaine', 'Charles', 'Gail', 'Queena', 'Blake', 'Chatwin', 'Gaines', 'Queenie', 'Bob', 'Chilton', 'Gleda', 'Quella', 'Bolton', 'Clark', 'Goldie', 'Quenna', 'Bond', 'Clayton', 'Gypsy', 'Radella']


window.addEventListener("load", function() {
  const nickname = getNickname();
  document.getElementById("nickname").textContent = nickname;
});

function getNickname() {
  // Random nickname if not in localStorage
  let nickname = localStorage.getItem("nickname");
  if (!nickname) {
    const randomNicknameIndex = Math.floor(Math.random() * nicknames.length - 1);
    const randomNickname = nicknames[randomNicknameIndex] + (Math.floor(Math.random() * 10000) + 1000);
    // store nickname to localstorage
    localStorage.setItem("nickname", randomNickname);
    nickname = randomNickname;
  }
  return nickname;
}
