//single state object

//pertanyaan
var state = {
  questions: [{
      question: 'Tujuan dilaksanakan ibadah haji?',
      answers: ['Mengunjungi Baitullah di Mekah kerana mengerjakan ibadat tertentu pada masa tertentu dengan syarat tertentu', 'Mengunjungi Kaabah di Mekah kerana melakukan tawaf kerana Allah', 'Mengunjungi Baitullah di Mekah kerana melakukan ibadat tertentu pada waktu tertentu.', 'Mengunjungi Baitullah di Mekah kerana ingin melakukan tawaf, saie dan bercukur'],
      answerCorrect: 0
    },
    {
      question: 'Apakah hukum menunaikan haji?',
      answers: ['Harus', 'Fardhu kifayah', 'Wajib bagi yang mampu', 'Sunat'],
      answerCorrect: 2
    },
    {
      question: 'Diantara berikut ini, manakah bukan merupakan rukun haji?',
      answers: ['Sai', 'Tertib', 'Wukuf', 'Melontar Jamratul Aqabah'],
      answerCorrect: 1
    },
    {
      question: 'Tanggal waktu dilaksanakannya wukuf bagi umat Islam ialah',
      answers: ['10 Zulhijjah', '10 Zulhijjah', '9 Zulhijjah', '10 Zulkaedah'],
      answerCorrect: 2
    },
    {
      question: 'Berikut, manakah yang bukan merupakan syarat-syarat dalam melakukan ibadah haji :',
      answers: ['Ada kesempatan waktu', 'Mempunyai ilmu yang luas tentang haji', 'Ada kendaraan untuk pulang dan pergi', 'Mempunyai nafkah yang cukup untuk tanggungan yang ditinggalkan'],
      answerCorrect: 0
    },
    {
      question: 'Berikut ini, manakah yang merupakan larangan saat mengerjakan haji?',
      answers: ['Menanam tanaman di Mekah', 'Menutup kepala bagi laki-laki', 'Memakai obat-obatan terlarang', 'Menutup tapak tangan bagi perempuan'],
      answerCorrect: 2
    },
    {
      question: 'Apakah yang dimaksud dengan tawaf ifadhah?',
      answers: ['Tawaf selamat datang', 'Tawaf selamat tinggal', 'Tawaf sunat yang boleh dilakukan sewaktu-waktu', 'Rukun Tawaf yang wajib dikerjakan oleh semua jemaah haji'],
      answerCorrect: 2
    },
    {
      question: 'Berikut adalah perkara sunat yang dilakukan sebelum niat ihram haji kecuali :',
      answers: ['Pakai pakaian ihram berwarna putih',
        'Memohon maaf atas kesalahan yang pernah dilakukan terhadap orang lain',
        'Memotong kuku',
        'Memakai minyak rambut dan bau-bauan'
      ],
      answerCorrect: 2
    },
    {
      question: 'Jemaah yang melakukan haji secara tamattuk atau qiran dikenakan dam berupa?',
      answers: ['Tertib dan taqdir', 'Tertib dan takdil', 'Takhyir dan taqdir', 'Takhyir dan takdil'],
      answerCorrect: 2
    },
    {
      question: 'Berikut adalah rukun umrah kecuali',
      answers: ['Wukuf', 'Tawaf', 'Sai', 'Tertib'],
      answerCorrect: 3
    }
  ],

  currentQuestion: 0,
  userScore: 0
}

// pendaftaran ketika tombol start di klik dan menggantikan div dengan heading
// dan tombol start
function clickStart() {
  $('.js-startPage').on('click', 'button', function(event) {

    $('.js-startPage').remove();
    $('#question-container').removeClass('hidden');
  })
};

// mendaftarkan ketika sebuah tombol yaitu answer telah diklik atau dipilih oleh user
function clickAnswer(chosenElement, state) {

  var chosenAnswer = $(chosenElement).val();

  //if the chosen answer is correct, then tell the user "correct", otherwise "wrong :("
  if (chosenAnswer == state.questions[state.currentQuestion].answerCorrect) {

    state.userScore += 1;
    $('.response1').text('Mantul!');
  } else {
    $('.response1').text('Kurang tepat :(');

    //add class "wrong answer" so that the button that was clicked can be
    //marked with a red colour
    $(chosenElement).addClass('wrong-answer');
  }

  //add class to the correct answer so that this can be highlighted in green
  $('.button' + state.questions[state.currentQuestion].answerCorrect).addClass('button-correct');

  //remove hover class from button so the highlighted answers will still stay red and green
  //when you hover over them
  $('button').removeClass('hover');

  //show result
  $('.result').removeClass('hidden');
  //show continue button
  $('.js-continue').removeClass('hidden');
  //disable the answer buttons so user cannot continue clicking them
  $('.js-answer').attr('disabled', true);

  return state;
}


function clickContinue(state) {
  //increment which question user is on by one when continue is clicked
  state.currentQuestion += 1;
  //hide continue button and result again, remove questions and answer
  $('.js-continue').addClass('hidden');
  $('.result').addClass('hidden');
  $('section').remove();

  //if quiz is done insert "you're done" and user's score
  //remove count and score from bottom of page
  if (state.currentQuestion > 9) {
    $('body').append('<h1 class="end">Anda telah selesai!</h1><p class ="endScore">Skor anda ' + state.userScore + " dari " + state.currentQuestion);
    $('body').append('<a href="index.html" class="balik">Kembali</a>');
    $('.js-count').remove();
    $('.js-score').remove();

  } else {
    //if quiz is not done insert new question and answers and update user score and question count
    $('#question-container').append("<section class = 'question-container col-8'>" +
      "<p class='question'>" + state.questions[state.currentQuestion].question + "</p><br>" +
      "<button class='button0 js-answer hover' value = '0'>" + state.questions[state.currentQuestion].answers[0] + "</button><br>" +
      "<button class='button1 js-answer hover' value = '1'>" + state.questions[state.currentQuestion].answers[1] + "</button><br>" +
      "<button class='button2 js-answer hover' value = '2'>" + state.questions[state.currentQuestion].answers[2] + "</button><br>" +
      "<button class='button3 js-answer hover' value = '3'>" + state.questions[state.currentQuestion].answers[3] + "</button>" +
      "</section>");

    $('.js-count').text("Soal: " + (state.currentQuestion + 1) + "/" + state.questions.length);
    $('.js-score').text("Benar: " + state.userScore + "/" + state.currentQuestion);
  }

}

$(function() {
  clickStart();
  $('#question-container').on('click', 'button', function(event) {

    clickAnswer($(this), state);
  });

  $('.js-continue').click(function(event) {

    clickContinue(state);
  });

});