'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    var extractGeneratorName = function (appname) {
      return _.capitalize(appname.replace('cst1b ', ''));
    };


    var prompts = [{
      type: 'text',
      name: 'courseName',
      message: 'What is the course name?',
      default: extractGeneratorName(this.appname)
    },{
      type: 'text',
      name: 'authorName',
      message: 'What is your name?',
      default: this.config.get('author', 'Daniel Chatfield')
    }];

    this.prompt(prompts, function (props) {
      this.courseName = props.courseName;
      this.authorName = props.authorName;

      this.config.set('author', this.authorName);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('course.sty'),
        this.destinationPath('course.sty'),
        this
      );
      this.fs.copy(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  }
});
