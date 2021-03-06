// ***************************************************************
// DOCUMENTS COLLECTION
// ***************************************************************

Activities = new Meteor.Collection('activities');

// Create my collectionFS
Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("images", {})]
});

// Images = new FS.Collection("images");
//

Posts = new Meteor.Collection('posts');

PostSchema = new SimpleSchema({
    picture: {
       type: String,
       autoform: {
         afFieldInput: {
           type: 'fileUpload',
           collection: 'Images',
           accept: 'image/*',
           label: 'Choose file',
           // uploadProgressTemplate: 'myUploadProgressTemplate',
           //自定义Custom select/remove file buttons
           selectFileBtnTemplate: 'mySelectFileBtn',
           removeFileBtnTemplate: 'myRemoveFileBtn',
           //回调  修改文件以及
           onBeforeInsert: function() {
           return function(fileObj) {
             fileObj.name('picture.png');
             return fileObj;
           };
         },
         onAfterInsert: function() {
           return function(err, fileObj) {
             if (err) {
               return alert('Error');
             } else {
               return alert('Upload successful');
             }
           };
         }
         }
       }
   }
});

Posts.attachSchema(PostSchema);

ActivitySchema = new SimpleSchema({
  title: {
    type: String,
    label: "活动标题",
    max: 20,
    optional: false
  },
  desc: {
    type: String,
    label: "活动描述",
    max: 1000,
    optional: true
  },
//   picture: {
//     type: String,
//     autoform: {
//       afFieldInput: {
//         type: 'fileUpload',
//         collection: 'Images',
//         accept: 'image/*',
//         label: 'Choose file',
//         // uploadProgressTemplate: 'myUploadProgressTemplate',
//         //自定义Custom select/remove file buttons
//         selectFileBtnTemplate: 'mySelectFileBtn',
//         removeFileBtnTemplate: 'myRemoveFileBtn',
//         //回调  修改文件以及
//         onBeforeInsert: function() {
//         return function(fileObj) {
//           fileObj.name('picture.png');
//           return fileObj;
//         };
//       },
//       onAfterInsert: function() {
//         return function(err, fileObj) {
//           if (err) {
//             return alert('Error');
//           } else {
//             return alert('Upload successful');
//           }
//         };
//       }
//       }
//     }
// },
  time: {
    type: Date,
    label: "时间",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "datetime-local"
      }
    }
  },
  where: {
    type: String,
    label: "地点",
    max: 1000,
    optional: true
  },
  limit: {
    type: String,
    label: "名额",
    max: 120,
    optional: false
  },
  fee: {
    type: String,
    label: "费用",
    max: 1000,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    denyUpdate: false,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    denyInsert: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }
});

// Must remember to attach the schema to the collection
Activities.attachSchema(ActivitySchema);

// Custom validation messages with SimpleSchema. Remove if not needed
Activities.simpleSchema().messages({
  required: "[label] is required",
  minString: "[label] must be at least [min] characters",
  maxString: "[label] cannot exceed [max] characters",
  minNumber: "[label] must be at least [min]",
  maxNumber: "[label] cannot exceed [max]",
  minDate: "[label] must be on or before [min]",
  maxDate: "[label] cannot be after [max]",
  minCount: "You must specify at least [minCount] values",
  maxCount: "You cannot specify more than [maxCount] values",
  noDecimal: "[label] must be an integer",
  notAllowed: "[value] is not an allowed value",
  expectedString: "[label] must be a string",
  expectedNumber: "[label] must be a number",
  expectedBoolean: "[label] must be a boolean",
  expectedArray: "[label] must be an array",
  expectedObject: "[label] must be an object",
  expectedConstructor: "[label] must be a [type]",
  regEx: [
  {msg: "[label] failed regular expression validation"},
  {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},
  {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
  {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
  {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
  {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
  {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
  {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
  {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
  {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
  ],
  keyNotInSchema: "[label] is not allowed by the schema"
});

// Allow and deny rules
Activities.allow({
  insert: function (userId, doc) {
    // Free-for-all!
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    // Free-for-all!
    return true;
  },
  remove: function (userId, doc) {
    // Free-for-all!
    return true;
  }
});

// Meteor methods related to collection
Meteor.methods({
  // someMethod: function(arg1, arg2) {
  //   return "some return value";
  // },
});

Images.allow({
  insert: function(userId, doc) {
    return true;
  },
  download: function(userId) {
    return true;
  }
});
