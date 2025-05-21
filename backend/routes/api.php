<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Counter;

Route::post('/increment/{id}', function ($id) {
    $counter = Counter::where('id', $id)->first();

    if (!$counter) {
        $counter = Counter::create(['id' => $id, 'value' => 1]);
    } else {
        $counter->increment('value');
    }

    return response()->json(['id' => $counter->id, 'value' => $counter->value]);
});

Route::get('/increment/{id}', function ($id) {
    $counter = Counter::where('id', $id)->first();

    if (!$counter) {
        $counter = Counter::create(['id' => $id, 'value' => 0]);
    }

    return response()->json(['value' => $counter->value]);
});
