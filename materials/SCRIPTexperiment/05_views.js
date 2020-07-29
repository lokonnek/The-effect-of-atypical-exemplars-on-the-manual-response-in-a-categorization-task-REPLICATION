// In this file you can instantiate your views
// We here first instantiate wrapping views, then the trial views


/** Wrapping views below

* Obligatory properties

    * trials: int - the number of trials this view will appear
    * name: string

*Optional properties
    * buttonText: string - the text on the button (default: 'next')
    * text: string - the text to be displayed in this view
    * title: string - the title of this view

    * More about the properties and functions of the wrapping views - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#wrapping-views

*/

// Every experiment should start with an intro view. Here you can welcome your participants and tell them what the experiment is about
const intro = magpieViews.view_generator("intro", {
  trials: 1,
  name: 'intro',
  // If you use JavaScripts Template String `I am a Template String`, you can use HTML <></> and javascript ${} inside
  text: `Welcome to our experiment and thank you for taking part in this study!
            <br />
            <br />
            You will be tasked with assigning animals to their species. The experiment will
            track your mouse movements in order to infer information about your decision processes.
            Please make sure that you will not be distracted during the experiment and draw your full attention to the task.
            <br />
            Please only proceed in this experiment if you are working on a device with a mouse or a mousepad. Tablets and smartphones are inadmissible.
            <br />
            <br />
            On the next page, you will find instructions about how to perform the experiment.`,
  buttonText: 'read instructions'
});

// For most tasks, you need instructions views
const instructions = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'General Instructions',
  text: `In this experiment, your task will be to classify animals into their respective species.
         <br />
         <br />
         In each trial, you will be presented with two species in the two upper corners of your screen. 
         After a short pause, in which you should make yourself familiar with the species, a button
         with the text "Click me!" will appear at the bottom center of your screen. Once you click it, the name of
         the animal to be categorized will be presented to you, at the same place where the button was located. 
         Now, move your mouse cursor to the species which you believe the animal belongs to and click on it. 
         This procedure will be repeated several times.
         <br />
         Please use your right hand only when selecting the category!
         <br />
         <br />
         There will be three practice trials for you to get familiar with the process. 
         After completing these trials, the real experiment will start.
         <br />
         Try to answer as quick and correct as you can!`,
  buttonText: 'go to practice trials'
});

const instructions_main = magpieViews.view_generator("instructions", {
  trials: 1,
  name: 'instructions',
  title: 'Main trials',
  text: `Great! You completed the practice trials. After this point, the
        real experiment will begin.
        <br />
         Remember to answer as quickly and correctly as possible.`,
  buttonText: 'go to main trials'
});


// In the post test questionnaire you can ask your participants addtional questions
const post_test = magpieViews.view_generator("post_test", {
  trials: 1,
  name: 'post_test',
  title: 'Additional information',
  text: 'Answering the following questions is optional, but your answers will help us analyze our results.'

  // You can change much of what appears here, e.g., to present it in a different language, as follows:
  // buttonText: 'Weiter',
  // age_question: 'Alter',
  // gender_question: 'Geschlecht',
  // gender_male: 'männlich',
  // gender_female: 'weiblich',
  // gender_other: 'divers',
  // edu_question: 'Höchster Bildungsabschluss',
  // edu_graduated_high_school: 'Abitur',
  // edu_graduated_college: 'Hochschulabschluss',
  // edu_higher_degree: 'Universitärer Abschluss',
  // languages_question: 'Muttersprache',
  // languages_more: '(in der Regel die Sprache, die Sie als Kind zu Hause gesprochen haben)',
  // comments_question: 'Weitere Kommentare'
});

// The 'thanks' view is crucial; never delete it; it submits the results!
const thanks = magpieViews.view_generator("thanks", {
  trials: 1,
  name: 'thanks',
  title: 'Thank you for taking part in this experiment!',
  prolificConfirmText: 'Press the button to finish the experiment'
});

/** trial (magpie's Trial Type Views) below

* Obligatory properties

    - trials: int - the number of trials this view will appear
    - name: string - the name of the view type as it shall be known to _magpie (e.g. for use with a progress bar)
            and the name of the trial as you want it to appear in the submitted data
    - data: array - an array of trial objects

* Optional properties

    - pause: number (in ms) - blank screen before the fixation point or stimulus show
    - fix_duration: number (in ms) - blank screen with fixation point in the middle
    - stim_duration: number (in ms) - for how long to have the stimulus on the screen
      More about trial life cycle - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

    - hook: object - option to hook and add custom functions to the view
      More about hooks - https://magpie-ea.github.io/magpie-docs/01_designing_experiments/04_lifecycles_hooks/

* All about the properties of trial views
* https://magpie-ea.github.io/magpie-docs/01_designing_experiments/01_template_views/#trial-views
*/


// Here, we initialize a normal forced_choice view
const handquestion = magpieViews.view_generator("forced_choice", {
  // This will use all trials specified in `data`, you can user a smaller value (for testing), but not a larger value
  trials: trial_info.forced_choice.length,
  // name should be identical to the variable name
  name: 'handquestion',
  data: trial_info.forced_choice,
  // you can add custom functions at different stages through a view's life cycle
  // hook: {
  //     after_response_enabled: check_response
  // }
});

const test_mousetracking_view = mousetracking_view_template({
  name: 'moustracking_practice',
  data: test_trial_data,
  trials: test_trial_data.length,
  mousetracking: {
    autostart: false,
    rate: 23
  }
});



const mousetracking_view = mousetracking_view_template({
  name: 'mousetracking_main',
  data: main_trial_data,
  trials: main_trial_data.length,
  mousetracking: {
      autostart: false,
      rate: 23
  }
});

// There are many more templates available:
// forced_choice, slider_rating, dropdown_choice, testbox_input, rating_scale, image_selection, sentence_choice,
// key_press, self_paced_reading and self_paced_reading_rating_scale
