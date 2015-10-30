Template.activityShow.rendered = function() {
};

Template.activityShow.helpers({
});

Template.activityShow.events ({
});

Template.activityShow.events ({
  'click .delete-activitie': function(e) {
    e.preventDefault();
    var item = this;

    if (confirm("Are you sure?")) {
      Activities.remove(item._id);
      console.log("Deleted!")
    }
  }
});

Template.registerHelper('formatdatetime', function(datetime){
  if (moment && datetime) {
    if(datetime.getDate() === new Date().getDate()){
      return "今天 " + moment(datetime).format("hh:mm");
    } else{
      return moment(datetime).format("YYYY/MM/DD hh:mm");
    }

  }
  else {
    return datetime;
  }
});

Template.registerHelper('formatdatetimeTime', function(datetime){
  if (moment && datetime) {
    if(datetime.getDate() === new Date().getDate()){
      return "今天 " + moment(datetime).format("hh:mm");
    } else{
      return moment(datetime).format("hh:mm");
    }

  }
  else {
    return datetime;
  }
});

Template.registerHelper('formatdatetimeDate', function(datetime){
  if (moment && datetime) {
    if(datetime.getDate() === new Date().getDate()){
      return "今天 " + moment(datetime).format("hh:mm");
    } else{
      return moment(datetime).format("YYYY-MM-DD");
    }

  }
  else {
    return datetime;
  }
});
