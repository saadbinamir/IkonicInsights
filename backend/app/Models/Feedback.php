<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Feedback extends Model
{
    use  HasFactory;
    protected $table = 'feedback';

    protected $fillable = ['user_id', 'title', 'description', 'category'];

    public function comments()
    {
        return $this->hasMany(Comm::class);
    }


    public function getComments()
    {
        return $this->comments()->get();
    }

    // Feedback model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
