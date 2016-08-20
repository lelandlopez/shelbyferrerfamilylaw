<?php

Route::get('/', function () {
    return view('home');
});

Route::get('/consultation_requests', function () {
    return view('consultation_requests');
});


//API

Route::get('/api/qwerqwer', function () {
	return App\Consultation_Request::all();
});

Route::post('/api/consultation_requests', function () {
	App\Consultation_Request::create(Request::all());
});

