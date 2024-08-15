$('#js-addBtn').click(async function(){
  let date = $('#js-schedule-date').val()
  ,   ttl = $('#js-schedule-ttl').val()
  ,   memo = $('#js-schedule-memo').val();

  if(date !== "" && ttl !== ""){
    await fetch('/api/user', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date: date, ttl: ttl, memo: memo }) });
    alert('登録しました');

    // reload
    location.reload();
  }
  else{
    alert('日にちとタイトルを入力してください。');
  }
})
