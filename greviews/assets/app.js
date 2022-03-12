$(document).ready(function(){
    console.log("jQuery is working");
    getjosndata ()

/**FETCH DATA WITH JSON */
function getjosndata (){
    fetch("assets/csv_db_10.json")
    .then(res=>res.json())
    .then(res=>{
        console.log(res[2])
    let template = '';
    let response = res[2].data[1];
    
        template += `<a id="name" href="${response['location_link']}" target="_blank">${response['name']}</a>
        <p>Gobierno Regional de, Av Paseo de la Republica 1538. urb, Chorrillos 15064</p>
        <button class="opinion-btn">
            <a href="https://www.google.com/search?q=Alejandra+Beauty+Salon+%26+Spa&rlz=1C1ALOY_en&sourceid=chrome&ie=UTF-8#lrd=0x9105b7d653f64f05:0x77a98194d61b8282,3,,," target="_blank" class="opinion-txt"><i class="bi bi-pencil" style="margin-right: 5px;"></i>Escribir Una Opinión</a>
          </button>
        <div class="main-stars">
          <div class="average">${response['rating']}</div>
          <div class="stars">
              <div>
                  <img src="assets/img/greviews-bg.png" class="starbg">
              </div>
              <div class="container-star" style="width: calc(${response['rating']}/5*100%);">
              <img src="assets/img/greviews.png" class="star-top">
              </div>
              
        </div>
          <a href="https://www.google.com/maps/place/Alejandra+Beauty+Salon+%26+Spa/@-12.1784405,-77.0107311,14z/data=!4m14!1m6!3m5!1s0x9105b7d653f64f05:0x77a98194d61b8282!2sAlejandra+Beauty+Salon+%26+Spa!8m2!3d-12.1784405!4d-77.0107311!3m6!1s0x9105b7d653f64f05:0x77a98194d61b8282!8m2!3d-12.1784405!4d-77.0107311!9m1!1b1"
          target="_blank" class="review-count">number of reviews</a>
      </div>`
      
    $('#main').html(template);


    $counter =0;
    let template2='';
    $todaystamp= Math.floor(Date.now()/1000);
    $todayhours =Math.floor($todaystamp/3600);
    $weeks=[];

    let response2= res[2].data
    console.log(response2)
    for(x in response2){
        
    
    $counter+=1;

    
    $olddayhours =Math.floor(response2[x].review_timestamp/3600);
    $hourslapsed= Math.floor($todayhours - $olddayhours);
    

    if ($hourslapsed <=1) {
        $weeks= $('.review-date').text('Hace pocos minutos')
    }
    if ($hourslapsed ==1) {
        $weeks= $('.review-date').text('Hace '+$hourslapsed+' hora')
    }
    if ($hourslapsed >=2 && $hourslapsed <=23) {
        $weeks= $('.review-date').text('Hace '+$hourslapsed+' horas')
    }
    if ($hourslapsed >=24 && $hourslapsed <=47) {
        $newtime =Math.floor($hourslapsed/24);
        $weeks= $('.review-date').text('Hace '+$newtime+' dia')
    }
    if ($hourslapsed >=48 && $hourslapsed <=167  ) {
        $newtime =Math.floor($hourslapsed/24);
        $weeks= $('.review-date').text('Hace '+$newtime+' dias')
    }
    if ($hourslapsed >=168 && $hourslapsed <=335) {
        $newtime =Math.floor($hourslapsed/168);
        $weeks= $('.review-date').text('Hace '+$newtime+' semana')
    }
    if ($hourslapsed >=336 && $hourslapsed <=729) {
        $newtime =Math.floor($hourslapsed/168);
        $weeks= $('.review-date').text('Hace '+$newtime+' semanas')
    }
    if ($hourslapsed >=730 && $hourslapsed <=1459) {
        $newtime =Math.floor($hourslapsed/730);
        $weeks= $('.review-date').text('Hace '+$newtime+' mes')
    }
    if ($hourslapsed >=1460 && $hourslapsed <=8759) {
        $newtime =Math.floor($hourslapsed/730);
        $weeks= $('.review-date').text('Hace '+$newtime+' meses')
    }
    if ($hourslapsed >=8760 && $hourslapsed <=17519) {
        $newtime =Math.floor($hourslapsed/8760);
        $weeks= $('.review-date').text('Hace '+$newtime+' año')
    }
    if ($hourslapsed >=17520) {
        $newtime =Math.floor($hourslapsed/8760);
        $weeks= $('.review-date').text('Hace '+$newtime+' años')
    }
    template2+=`<div class="comment">
        <img class="profile-photo" src="${response2[x]['author_image']}">
                <div class="comment-content">
                    <a href="${response2[x]['author_link']}" target="_blank" class="profile-name">${response2[x]['author_title']}</a>
                    <p class="review-date">${$weeks[0].textContent}</p>
                    <div class="stars-comment">
                        <div>
                            <img src="assets/img/greviews-bg.png" class="star-comment-starbg">
                        </div>
                        <div class="container-star-comment" style="width: calc(${response2[x]['review_rating']}/5*100%);">
                        <img src="assets/img/greviews.png" class="star-top-comments">
                        </div>
                    </div>
                    <div class="message"><p>${response2[x]['review_text']}</p></div>
                </div>
        </div>`}
console.log($counter);
$('.reviews2').html(template2);
$('.review-count').text($counter+' opiniones');
    
    })
}

});